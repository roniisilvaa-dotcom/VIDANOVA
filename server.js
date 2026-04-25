const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Pool } = require("pg");
const path = require("path");
const fs = require("fs");
const fsp = require("fs/promises");
const https = require("https");
const webPush = require("web-push");

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET =
  process.env.JWT_SECRET || "sua_chave_secreta_super_segura_mudar_em_producao";
const DATABASE_URL = process.env.DATABASE_URL;
const ADMIN_NAME = process.env.ADMIN_NAME || "Admin";
const ADMIN_EMAIL = normalizeEmail(process.env.ADMIN_EMAIL || "admin@vidanova.app");
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "@CARO26";
const KIWIFY_WEBHOOK_TOKEN = process.env.KIWIFY_WEBHOOK_TOKEN || "";
const KIWIFY_PRODUCT_ID = process.env.KIWIFY_PRODUCT_ID || "";
const KIWIFY_CHECKOUT_URL = process.env.KIWIFY_CHECKOUT_URL || "";
const MONTHLY_SUBSCRIPTION_PRICE = Number(process.env.MONTHLY_SUBSCRIPTION_PRICE || 0);
const ANNUAL_SUBSCRIPTION_PRICE = Number(process.env.ANNUAL_SUBSCRIPTION_PRICE || 0);
const KIWIFY_CHECKOUT_URL_ANNUAL = process.env.KIWIFY_CHECKOUT_URL_ANNUAL || "";
const DATA_FILE = path.join(__dirname, "vida-nova-fallback.json");

const VAPID_PUBLIC_KEY = process.env.VAPID_PUBLIC_KEY || "BEXjy4tVUIHgrOsny2mSdzm9LQknr7RmsB749yLH84ULm4cr2pz3ZyL_xgb6bs9qdilkDw6rcpDgMvuHIgLVb7I";
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY || "eVU7F8kgQp1XxGs6AgfePksCVhoSIJGiPDJ4CF8m8bo";
const VAPID_SUBJECT = process.env.VAPID_SUBJECT || "mailto:admin@vidanova.app";
const YOUTUBE_CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID || "UCCZ8WBRcpJuRXJGBlAGoKSA";

try {
  webPush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);
} catch (e) {
  console.error("Erro ao configurar VAPID:", e.message);
}

const isUsingDatabase = Boolean(DATABASE_URL);
const pool = isUsingDatabase
  ? new Pool({
      connectionString: DATABASE_URL,
      ssl: shouldUseSsl(DATABASE_URL)
        ? {
            rejectUnauthorized: false,
          }
        : false,
    })
  : null;

app.use(cors());
app.use(express.json({ limit: "2mb" }));

// version.json must never be cached so auto-update detection works
app.get("/version.json", (req, res, next) => {
  res.set("Cache-Control", "no-store, no-cache, must-revalidate");
  res.set("Pragma", "no-cache");
  next();
});

app.use(express.static(path.join(__dirname)));

function shouldUseSsl(connectionString) {
  return !/sslmode=disable/i.test(connectionString);
}

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function detectDeviceInfo(userAgent = "") {
  const ua = String(userAgent || "");
  const isTablet = /iPad|Tablet|PlayBook|Silk/i.test(ua);
  const isMobile = !isTablet && /Android|iPhone|iPod|Mobile/i.test(ua);
  const isDesktop = !isTablet && !isMobile;

  let platform = "Web";
  if (/iPhone/i.test(ua)) {
    platform = "iPhone";
  } else if (/iPad/i.test(ua)) {
    platform = "iPad";
  } else if (/Android/i.test(ua)) {
    platform = "Android";
  } else if (/Windows/i.test(ua)) {
    platform = "Windows";
  } else if (/Macintosh|Mac OS X/i.test(ua)) {
    platform = "Mac";
  } else if (/Linux/i.test(ua)) {
    platform = "Linux";
  }

  let browser = "Web";
  if (/Edg\//i.test(ua)) {
    browser = "Edge";
  } else if (/OPR\//i.test(ua)) {
    browser = "Opera";
  } else if (/Chrome\//i.test(ua) && !/Edg\//i.test(ua)) {
    browser = "Chrome";
  } else if (/Firefox\//i.test(ua)) {
    browser = "Firefox";
  } else if (/Safari\//i.test(ua) && !/Chrome\//i.test(ua)) {
    browser = "Safari";
  }

  return {
    device_type: isTablet ? "tablet" : isMobile ? "mobile" : "desktop",
    platform,
    browser,
    label: `${platform} ${browser}`.trim(),
    user_agent: ua,
  };
}

function getTokenPayload(token) {
  return jwt.verify(token, JWT_SECRET);
}

function getDefaultStore() {
  return {
    counters: {
      user: 1,
      appData: 1,
      activity: 1,
    },
    users: [],
    appData: [],
    activityLog: [],
    pushSubscriptions: [],
  };
}

function getUserRole(email = "", role = "") {
  if (String(role || "").toLowerCase() === "admin") {
    return "admin";
  }

  return normalizeEmail(email) && normalizeEmail(email) === ADMIN_EMAIL ? "admin" : "user";
}

function resolveLoginIdentifier(value = "") {
  const normalizedValue = String(value || "").trim().toLowerCase();
  const adminAliases = new Set([
    "admin",
    String(ADMIN_NAME || "").trim().toLowerCase(),
    String(ADMIN_EMAIL || "").split("@")[0],
    String(ADMIN_EMAIL || "").trim().toLowerCase(),
  ]);

  if (adminAliases.has(normalizedValue)) {
    return ADMIN_EMAIL;
  }

  return normalizeEmail(value);
}

async function ensureFallbackFile() {
  if (process.env.VERCEL) return; // filesystem read-only in serverless
  if (!fs.existsSync(DATA_FILE)) {
    await fsp.writeFile(DATA_FILE, JSON.stringify(getDefaultStore(), null, 2));
  }
}

async function readStore() {
  await ensureFallbackFile();
  const raw = await fsp.readFile(DATA_FILE, "utf8");
  return raw ? JSON.parse(raw) : getDefaultStore();
}

async function writeStore(store) {
  await fsp.writeFile(DATA_FILE, JSON.stringify(store, null, 2));
}

async function query(text, params = []) {
  return pool.query(text, params);
}

async function initDb() {
  if (!isUsingDatabase) {
    await ensureFallbackFile();
    return;
  }

  await query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT DEFAULT 'user',
      avatar_url TEXT,
      subscription_url TEXT,
      subscription_active BOOLEAN DEFAULT FALSE,
      subscription_status TEXT DEFAULT 'pending',
      subscription_expires TIMESTAMPTZ,
      kiwify_customer_id TEXT,
      kiwify_subscription_id TEXT,
      kiwify_product_id TEXT,
      kiwify_order_id TEXT,
      created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await query(`
    ALTER TABLE users
    ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'user'
  `);

  await query(`
    ALTER TABLE users
    ADD COLUMN IF NOT EXISTS avatar_url TEXT
  `);

  await query(`
    ALTER TABLE users
    ADD COLUMN IF NOT EXISTS subscription_url TEXT
  `);

  await query(`
    ALTER TABLE users
    ADD COLUMN IF NOT EXISTS subscription_status TEXT DEFAULT 'pending'
  `);

  await query(`
    ALTER TABLE users
    ADD COLUMN IF NOT EXISTS kiwify_customer_id TEXT
  `);

  await query(`
    ALTER TABLE users
    ADD COLUMN IF NOT EXISTS kiwify_subscription_id TEXT
  `);

  await query(`
    ALTER TABLE users
    ADD COLUMN IF NOT EXISTS kiwify_product_id TEXT
  `);

  await query(`
    ALTER TABLE users
    ADD COLUMN IF NOT EXISTS kiwify_order_id TEXT
  `);

  await query(`
    ALTER TABLE users
    ADD COLUMN IF NOT EXISTS last_device_type TEXT
  `);

  await query(`
    ALTER TABLE users
    ADD COLUMN IF NOT EXISTS last_platform TEXT
  `);

  await query(`
    ALTER TABLE users
    ADD COLUMN IF NOT EXISTS last_browser TEXT
  `);

  await query(`
    ALTER TABLE users
    ADD COLUMN IF NOT EXISTS last_device_label TEXT
  `);

  await query(`
    ALTER TABLE users
    ADD COLUMN IF NOT EXISTS last_seen_at TIMESTAMPTZ
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS app_data (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      data_type TEXT NOT NULL,
      data_key TEXT NOT NULL,
      data_value JSONB,
      created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
      UNIQUE (user_id, data_type, data_key)
    )
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS activity_log (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      action TEXT NOT NULL,
      details TEXT,
      created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await query(`
    CREATE INDEX IF NOT EXISTS idx_app_data_user_type
    ON app_data (user_id, data_type)
  `);

  await query(`
    CREATE INDEX IF NOT EXISTS idx_activity_log_user
    ON activity_log (user_id, created_at DESC)
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS push_subscriptions (
      id SERIAL PRIMARY KEY,
      endpoint TEXT UNIQUE NOT NULL,
      p256dh TEXT NOT NULL,
      auth TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS app_settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

async function findUserByEmail(email) {
  if (isUsingDatabase) {
    const result = await query(`SELECT * FROM users WHERE email = $1`, [email]);
    return result.rows[0] || null;
  }

  const store = await readStore();
  return store.users.find((user) => user.email === email) || null;
}

async function findUserById(id) {
  if (isUsingDatabase) {
    const result = await query(
      `SELECT id, name, email, role, avatar_url, subscription_url, subscription_active, subscription_status, subscription_expires
       FROM users
       WHERE id = $1`,
      [id],
    );
    return result.rows[0] || null;
  }

  const store = await readStore();
  const user = store.users.find((item) => item.id === id);

  if (!user) {
    return null;
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: getUserRole(user.email, user.role),
    avatar_url: user.avatar_url || "",
    subscription_url: user.subscription_url || "",
    subscription_active: user.subscription_active,
    subscription_status: user.subscription_status || "pending",
    subscription_expires: user.subscription_expires || null,
    last_device_type: user.last_device_type || "",
    last_platform: user.last_platform || "",
    last_browser: user.last_browser || "",
    last_device_label: user.last_device_label || "",
    last_seen_at: user.last_seen_at || null,
  };
}

async function createUser({ name, email, password, avatarUrl = "", subscriptionUrl = "" }) {
  const role = getUserRole(email);
  if (isUsingDatabase) {
    const result = await query(
      `INSERT INTO users (name, email, password, role, avatar_url, subscription_url, subscription_status)
       VALUES ($1, $2, $3, $4, $5, $6, 'pending')
       RETURNING id, name, email, role, avatar_url, subscription_url, subscription_active, subscription_status, subscription_expires, last_device_type, last_platform, last_browser, last_device_label, last_seen_at`,
      [name, email, password, role, avatarUrl, subscriptionUrl || KIWIFY_CHECKOUT_URL],
    );

    return result.rows[0];
  }

  const store = await readStore();
  const user = {
    id: store.counters.user++,
    name,
    email,
    password,
    role,
    avatar_url: avatarUrl,
    subscription_url: subscriptionUrl || KIWIFY_CHECKOUT_URL,
    subscription_active: false,
    subscription_status: "pending",
    subscription_expires: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  store.users.push(user);
  await writeStore(store);

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: getUserRole(user.email, user.role),
    avatar_url: user.avatar_url || "",
    subscription_url: user.subscription_url || "",
    subscription_active: user.subscription_active,
    subscription_status: user.subscription_status || "pending",
    subscription_expires: user.subscription_expires || null,
    last_device_type: user.last_device_type || "",
    last_platform: user.last_platform || "",
    last_browser: user.last_browser || "",
    last_device_label: user.last_device_label || "",
    last_seen_at: user.last_seen_at || null,
  };
}

function normalizeSubscriptionStatus(active, status, expiresAt) {
  if (expiresAt) {
    const expiresTime = new Date(expiresAt).getTime();
    if (!Number.isNaN(expiresTime) && expiresTime < Date.now()) {
      return "expired";
    }
  }
  if (active) {
    return "active";
  }
  if (status) {
    return String(status).toLowerCase();
  }
  return "pending";
}

function isSubscriptionActive(user) {
  if (!user) {
    return false;
  }

  const expiresAt = user.subscription_expires || null;
  if (expiresAt && new Date(expiresAt).getTime() < Date.now()) {
    return false;
  }

  return normalizeSubscriptionStatus(
    user.subscription_active,
    user.subscription_status,
    expiresAt,
  ) === "active";
}

function buildPublicUser(user) {
  const role = getUserRole(user.email, user.role);
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role,
    is_admin: role === "admin",
    avatar_url: user.avatar_url || "",
    subscription_url: user.subscription_url || KIWIFY_CHECKOUT_URL || "",
    subscription_active: isSubscriptionActive(user),
    subscription_status: normalizeSubscriptionStatus(
      user.subscription_active,
      user.subscription_status,
      user.subscription_expires,
    ),
    subscription_expires: user.subscription_expires || null,
    last_device_type: user.last_device_type || "",
    last_platform: user.last_platform || "",
    last_browser: user.last_browser || "",
    last_device_label: user.last_device_label || "",
    last_seen_at: user.last_seen_at || null,
  };
}

async function updateUserLastSeenDevice(userId, userAgent = "") {
  const deviceInfo = detectDeviceInfo(userAgent);

  if (isUsingDatabase) {
    await query(
      `UPDATE users
       SET last_device_type = $1,
           last_platform = $2,
           last_browser = $3,
           last_device_label = $4,
           last_seen_at = CURRENT_TIMESTAMP,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $5`,
      [
        deviceInfo.device_type,
        deviceInfo.platform,
        deviceInfo.browser,
        deviceInfo.label,
        userId,
      ],
    );
    return;
  }

  const store = await readStore();
  const user = store.users.find((entry) => entry.id === userId);
  if (!user) {
    return;
  }

  user.last_device_type = deviceInfo.device_type;
  user.last_platform = deviceInfo.platform;
  user.last_browser = deviceInfo.browser;
  user.last_device_label = deviceInfo.label;
  user.last_seen_at = new Date().toISOString();
  user.updated_at = new Date().toISOString();
  await writeStore(store);
}

function pickFirstString(candidates = []) {
  const found = candidates.find((value) => typeof value === "string" && value.trim());
  return found ? found.trim() : "";
}

function pickFirstObject(candidates = []) {
  return candidates.find((value) => value && typeof value === "object") || null;
}

function resolveKiwifyEventType(payload) {
  return pickFirstString([
    payload?.event,
    payload?.trigger,
    payload?.type,
    payload?.action,
    payload?.event_name,
  ]).toLowerCase();
}

function extractKiwifyPayload(payload) {
  const customer = pickFirstObject([
    payload?.customer,
    payload?.Customer,
    payload?.buyer,
    payload?.buyer_data,
    payload?.data?.customer,
    payload?.data?.buyer,
    payload?.order?.customer,
    payload?.sale?.customer,
    payload?.subscription?.customer,
  ]);

  const subscription = pickFirstObject([
    payload?.subscription,
    payload?.data?.subscription,
  ]);

  const order = pickFirstObject([
    payload?.order,
    payload?.sale,
    payload?.data?.order,
    payload?.data?.sale,
  ]);

  return {
    eventType: resolveKiwifyEventType(payload),
    email: normalizeEmail(
      pickFirstString([
        payload?.email,
        payload?.customer_email,
        payload?.buyer_email,
        customer?.email,
        customer?.mail,
        order?.customer_email,
        subscription?.email,
      ]),
    ),
    name: pickFirstString([
      payload?.name,
      payload?.customer_name,
      payload?.buyer_name,
      customer?.name,
      order?.customer_name,
      subscription?.name,
    ]),
    customerId: pickFirstString([
      payload?.customer_id,
      customer?.id,
      customer?.customer_id,
    ]),
    subscriptionId: pickFirstString([
      payload?.subscription_id,
      subscription?.id,
      subscription?.subscription_id,
    ]),
    productId: pickFirstString([
      payload?.product_id,
      payload?.offer_id,
      order?.product_id,
      subscription?.product_id,
    ]),
    orderId: pickFirstString([
      payload?.order_id,
      payload?.sale_id,
      order?.id,
      order?.order_id,
    ]),
    expiresAt: pickFirstString([
      payload?.subscription_expires_at,
      payload?.expires_at,
      subscription?.expires_at,
      subscription?.next_charge_date,
    ]),
    status: pickFirstString([
      payload?.status,
      payload?.subscription_status,
      subscription?.status,
    ]),
    raw: payload,
  };
}

async function savePushSubscription(endpoint, p256dh, auth) {
  if (isUsingDatabase) {
    await query(
      `INSERT INTO push_subscriptions (endpoint, p256dh, auth)
       VALUES ($1, $2, $3)
       ON CONFLICT (endpoint) DO UPDATE SET p256dh = $2, auth = $3`,
      [endpoint, p256dh, auth],
    );
    return;
  }
  const store = await readStore();
  if (!store.pushSubscriptions) store.pushSubscriptions = [];
  const idx = store.pushSubscriptions.findIndex((s) => s.endpoint === endpoint);
  if (idx >= 0) {
    store.pushSubscriptions[idx] = { endpoint, p256dh, auth };
  } else {
    store.pushSubscriptions.push({ endpoint, p256dh, auth });
  }
  await writeStore(store);
}

async function removePushSubscription(endpoint) {
  if (isUsingDatabase) {
    await query(`DELETE FROM push_subscriptions WHERE endpoint = $1`, [endpoint]);
    return;
  }
  const store = await readStore();
  if (!store.pushSubscriptions) return;
  store.pushSubscriptions = store.pushSubscriptions.filter((s) => s.endpoint !== endpoint);
  await writeStore(store);
}

async function getAllPushSubscriptions() {
  if (isUsingDatabase) {
    const result = await query(`SELECT endpoint, p256dh, auth FROM push_subscriptions`);
    return result.rows;
  }
  const store = await readStore();
  return store.pushSubscriptions || [];
}

async function sendPushToAll(title, body, url = "/") {
  const subscriptions = await getAllPushSubscriptions();
  if (!subscriptions.length) return { sent: 0, failed: 0, total: 0 };

  const payload = JSON.stringify({ title, body, url });
  const results = await Promise.allSettled(
    subscriptions.map(async (sub) => {
      try {
        await webPush.sendNotification(
          { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } },
          payload,
        );
      } catch (err) {
        if (err.statusCode === 410 || err.statusCode === 404) {
          await removePushSubscription(sub.endpoint).catch(() => {});
        }
        throw err;
      }
    }),
  );

  const sent = results.filter((r) => r.status === "fulfilled").length;
  const failed = results.filter((r) => r.status === "rejected").length;
  console.log(`Push enviado: ${sent} ok, ${failed} falhas`);
  return { sent, failed, total: subscriptions.length };
}

async function getAppSetting(key) {
  if (isUsingDatabase) {
    const result = await query(`SELECT value FROM app_settings WHERE key = $1`, [key]);
    return result.rows[0]?.value || null;
  }
  const store = await readStore();
  return store.appSettings?.[key] || null;
}

async function setAppSetting(key, value) {
  if (isUsingDatabase) {
    await query(
      `INSERT INTO app_settings (key, value) VALUES ($1, $2)
       ON CONFLICT (key) DO UPDATE SET value = $2, updated_at = CURRENT_TIMESTAMP`,
      [key, value],
    );
    return;
  }
  const store = await readStore();
  if (!store.appSettings) store.appSettings = {};
  store.appSettings[key] = value;
  await writeStore(store);
}

function fetchYouTubeRss(channelId) {
  return new Promise((resolve, reject) => {
    const url = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
    https.get(url, { headers: { "User-Agent": "Mozilla/5.0 VidaNovaBot/1.0" } }, (res) => {
      let data = "";
      res.on("data", (chunk) => { data += chunk; });
      res.on("end", () => {
        const entryMatch = data.match(/<entry>([\s\S]*?)<\/entry>/);
        if (!entryMatch) return resolve(null);
        const entryXml = entryMatch[1];
        const videoIdMatch = entryXml.match(/<yt:videoId>([^<]+)<\/yt:videoId>/);
        const titleMatch = entryXml.match(/<title>([^<]+)<\/title>/);
        const publishedMatch = entryXml.match(/<published>([^<]+)<\/published>/);
        const videoId = videoIdMatch?.[1]?.trim() || null;
        const rawTitle = titleMatch?.[1]?.trim() || "";
        const title = rawTitle.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"');
        const published = publishedMatch?.[1]?.trim() || null;
        resolve(videoId ? { videoId, title, published } : null);
      });
      res.on("error", reject);
    }).on("error", reject);
  });
}

let _lastYouTubeVideoId = null;

async function checkYouTubeForNewVideo() {
  try {
    const video = await fetchYouTubeRss(YOUTUBE_CHANNEL_ID);
    if (!video?.videoId) return;

    if (_lastYouTubeVideoId === null) {
      _lastYouTubeVideoId = await getAppSetting("last_youtube_video_id");
    }

    if (_lastYouTubeVideoId === null) {
      _lastYouTubeVideoId = video.videoId;
      await setAppSetting("last_youtube_video_id", video.videoId);
      console.log("YouTube: baseline definido —", video.videoId);
      return;
    }

    if (video.videoId !== _lastYouTubeVideoId) {
      console.log("YouTube: novo vídeo detectado —", video.title);
      _lastYouTubeVideoId = video.videoId;
      await setAppSetting("last_youtube_video_id", video.videoId);
      await sendPushToAll(
        "Novo vídeo no canal!",
        video.title || "Veja agora o mais recente!",
        `https://www.youtube.com/watch?v=${video.videoId}`,
      );
    }
  } catch (err) {
    console.error("Erro ao verificar YouTube RSS:", err.message);
  }
}

function startYouTubePolling() {
  checkYouTubeForNewVideo();
  setInterval(checkYouTubeForNewVideo, 15 * 60 * 1000);
  console.log("YouTube polling iniciado, canal:", YOUTUBE_CHANNEL_ID);
}

async function emailInUse(email, excludedUserId = null) {
  if (!email) {
    return false;
  }

  if (isUsingDatabase) {
    const result = excludedUserId
      ? await query(`SELECT id FROM users WHERE email = $1 AND id <> $2 LIMIT 1`, [
          email,
          excludedUserId,
        ])
      : await query(`SELECT id FROM users WHERE email = $1 LIMIT 1`, [email]);

    return Boolean(result.rows[0]);
  }

  const store = await readStore();
  return store.users.some(
    (user) => user.email === email && (excludedUserId === null || user.id !== excludedUserId),
  );
}

async function getUserWithPasswordById(id) {
  if (isUsingDatabase) {
    const result = await query(`SELECT * FROM users WHERE id = $1`, [id]);
    return result.rows[0] || null;
  }

  const store = await readStore();
  return store.users.find((user) => user.id === id) || null;
}

async function logActivity(userId, action, details) {
  try {
    if (isUsingDatabase) {
      await query(
        `INSERT INTO activity_log (user_id, action, details) VALUES ($1, $2, $3)`,
        [userId, action, details],
      );
      return;
    }

    const store = await readStore();
    store.activityLog.push({
      id: store.counters.activity++,
      user_id: userId,
      action,
      details,
      created_at: new Date().toISOString(),
    });
    await writeStore(store);
  } catch (error) {
    console.error("Erro ao registrar atividade:", error.message);
  }
}

async function saveUserData(userId, dataType, dataKey, dataValue) {
  if (isUsingDatabase) {
    await query(
      `INSERT INTO app_data (user_id, data_type, data_key, data_value, updated_at)
       VALUES ($1, $2, $3, $4::jsonb, CURRENT_TIMESTAMP)
       ON CONFLICT (user_id, data_type, data_key)
       DO UPDATE SET
         data_value = EXCLUDED.data_value,
         updated_at = CURRENT_TIMESTAMP`,
      [userId, dataType, dataKey, JSON.stringify(dataValue)],
    );
    return;
  }

  const store = await readStore();
  const existing = store.appData.find(
    (item) =>
      item.user_id === userId &&
      item.data_type === dataType &&
      item.data_key === dataKey,
  );

  if (existing) {
    existing.data_value = dataValue;
    existing.updated_at = new Date().toISOString();
  } else {
    store.appData.push({
      id: store.counters.appData++,
      user_id: userId,
      data_type: dataType,
      data_key: dataKey,
      data_value: dataValue,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
  }

  await writeStore(store);
}

async function getUserData(userId, dataType) {
  if (isUsingDatabase) {
    const result = await query(
      `SELECT data_key, data_value FROM app_data WHERE user_id = $1 AND data_type = $2`,
      [userId, dataType],
    );

    const data = {};
    result.rows.forEach((row) => {
      data[row.data_key] = row.data_value;
    });
    return data;
  }

  const store = await readStore();
  const data = {};

  store.appData
    .filter((item) => item.user_id === userId && item.data_type === dataType)
    .forEach((item) => {
      data[item.data_key] = item.data_value;
    });

  return data;
}

async function listUserDataEntries(userId, dataType) {
  if (isUsingDatabase) {
    const result = await query(
      `SELECT data_key, data_value, created_at, updated_at
       FROM app_data
       WHERE user_id = $1 AND data_type = $2
       ORDER BY updated_at DESC, created_at DESC`,
      [userId, dataType],
    );

    return result.rows.map((row) => ({
      key: row.data_key,
      value: row.data_value,
      created_at: row.created_at,
      updated_at: row.updated_at,
    }));
  }

  const store = await readStore();
  return store.appData
    .filter((item) => item.user_id === userId && item.data_type === dataType)
    .sort((a, b) => new Date(b.updated_at || b.created_at || 0).getTime() - new Date(a.updated_at || a.created_at || 0).getTime())
    .map((item) => ({
      key: item.data_key,
      value: item.data_value,
      created_at: item.created_at,
      updated_at: item.updated_at,
    }));
}

async function updateUserProfile(
  userId,
  { name, email, password, avatarUrl, subscriptionUrl },
) {
  if (isUsingDatabase) {
    const updates = [];
    const params = [];

    if (name) {
      params.push(String(name).trim());
      updates.push(`name = $${params.length}`);
    }

    if (password) {
      params.push(password);
      updates.push(`password = $${params.length}`);
    }

    if (email) {
      params.push(normalizeEmail(email));
      updates.push(`email = $${params.length}`);
    }

    if (avatarUrl !== undefined) {
      params.push(avatarUrl || "");
      updates.push(`avatar_url = $${params.length}`);
    }

    if (subscriptionUrl !== undefined) {
      params.push(subscriptionUrl || "");
      updates.push(`subscription_url = $${params.length}`);
    }

    if (!updates.length) {
      return null;
    }

    params.push(userId);
    const result = await query(
      `UPDATE users
       SET ${updates.join(", ")}, updated_at = CURRENT_TIMESTAMP
       WHERE id = $${params.length}
       RETURNING id, name, email, role, avatar_url, subscription_url, subscription_active, subscription_status, subscription_expires`,
      params,
    );

    return result.rows[0] || null;
  }

  const store = await readStore();
  const user = store.users.find((item) => item.id === userId);

  if (!user) {
    return null;
  }

  if (name) {
    user.name = String(name).trim();
  }

  if (password) {
    user.password = password;
  }

  if (email) {
    user.email = normalizeEmail(email);
  }

  if (avatarUrl !== undefined) {
    user.avatar_url = avatarUrl || "";
  }

  if (subscriptionUrl !== undefined) {
    user.subscription_url = subscriptionUrl || "";
  }

  user.updated_at = new Date().toISOString();
  await writeStore(store);

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: getUserRole(user.email, user.role),
    avatar_url: user.avatar_url || "",
    subscription_url: user.subscription_url || "",
    subscription_active: user.subscription_active,
    subscription_status: user.subscription_status || "pending",
    subscription_expires: user.subscription_expires || null,
  };
}

async function ensureAdminUser() {
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    return null;
  }

  const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);

  if (isUsingDatabase) {
    const existing = await query(`SELECT * FROM users WHERE email = $1 LIMIT 1`, [ADMIN_EMAIL]);

    if (existing.rows[0]) {
      const result = await query(
        `UPDATE users
         SET name = COALESCE(NULLIF($1, ''), name),
             password = $2,
             role = 'admin',
             subscription_active = TRUE,
             subscription_status = 'active',
             subscription_url = COALESCE(NULLIF(subscription_url, ''), $3),
             updated_at = CURRENT_TIMESTAMP
         WHERE email = $4
         RETURNING *`,
        [ADMIN_NAME, hashedPassword, KIWIFY_CHECKOUT_URL || "", ADMIN_EMAIL],
      );
      return result.rows[0] || existing.rows[0];
    }

    const created = await query(
      `INSERT INTO users (
         name, email, password, role, avatar_url, subscription_url,
         subscription_active, subscription_status, subscription_expires
       ) VALUES ($1, $2, $3, 'admin', '', $4, TRUE, 'active', NULL)
       RETURNING *`,
      [ADMIN_NAME, ADMIN_EMAIL, hashedPassword, KIWIFY_CHECKOUT_URL || ""],
    );

    return created.rows[0] || null;
  }

  const store = await readStore();
  let user = store.users.find((entry) => entry.email === ADMIN_EMAIL);

  if (!user) {
    user = {
      id: store.counters.user++,
      name: ADMIN_NAME,
      email: ADMIN_EMAIL,
      password: hashedPassword,
      role: "admin",
      avatar_url: "",
      subscription_url: KIWIFY_CHECKOUT_URL || "",
      subscription_active: true,
      subscription_status: "active",
      subscription_expires: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    store.users.push(user);
  } else {
    user.name = ADMIN_NAME || user.name;
    user.password = hashedPassword;
    user.role = "admin";
    user.subscription_active = true;
    user.subscription_status = "active";
    user.subscription_url = user.subscription_url || KIWIFY_CHECKOUT_URL || "";
    user.updated_at = new Date().toISOString();
  }

  await writeStore(store);
  return user;
}

async function listUsersForAdmin() {
  if (isUsingDatabase) {
    const result = await query(
      `SELECT
         users.id,
         users.name,
         users.email,
         users.role,
         users.avatar_url,
         users.subscription_url,
         users.subscription_active,
         users.subscription_status,
         users.subscription_expires,
         users.last_device_type,
         users.last_platform,
         users.last_browser,
         users.last_device_label,
         users.last_seen_at,
         users.created_at,
         users.updated_at,
         COUNT(app_data.id)::INTEGER AS data_entries,
         MAX(activity_log.created_at) AS last_activity_at
       FROM users
       LEFT JOIN app_data ON app_data.user_id = users.id
       LEFT JOIN activity_log ON activity_log.user_id = users.id
       GROUP BY users.id
       ORDER BY created_at DESC, id DESC`,
    );
    return result.rows;
  }

  const store = await readStore();
  return [...store.users]
    .map((user) => ({
      ...user,
      data_entries: store.appData.filter((item) => item.user_id === user.id).length,
      last_activity_at:
        [...store.activityLog]
          .filter((item) => item.user_id === user.id)
          .sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime())[0]
          ?.created_at || null,
    }))
    .sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime());
}

async function getAdminSummary() {
  const users = await listUsersForAdmin();
  const normalized = users.map((user) => buildPublicUser(user));
  const renewSoonUsers = normalized.filter((user) => {
    if (!user.subscription_expires || user.subscription_status !== "active") {
      return false;
    }

    const expiresTime = new Date(user.subscription_expires).getTime();
    const diff = expiresTime - Date.now();
    return diff >= 0 && diff <= 7 * 24 * 60 * 60 * 1000;
  }).length;
  const projectedMonthlyRevenue = normalized.filter((user) => user.subscription_status === "active").length * MONTHLY_SUBSCRIPTION_PRICE;

  return {
    totalUsers: normalized.length,
    activeUsers: normalized.filter((user) => user.subscription_status === "active").length,
    pendingUsers: normalized.filter((user) => user.subscription_status === "pending").length,
    inactiveUsers: normalized.filter((user) =>
      ["inactive", "expired", "late"].includes(user.subscription_status),
    ).length,
    adminUsers: normalized.filter((user) => user.role === "admin").length,
    renewSoonUsers,
    projectedMonthlyRevenue,
    monthlySubscriptionPrice: MONTHLY_SUBSCRIPTION_PRICE,
  };
}

async function getRecentAdminActivity(limit = 25) {
  if (isUsingDatabase) {
    const result = await query(
      `SELECT
         activity_log.id,
         activity_log.action,
         activity_log.details,
         activity_log.created_at,
         users.email,
         users.name
       FROM activity_log
       LEFT JOIN users ON users.id = activity_log.user_id
       ORDER BY activity_log.created_at DESC
       LIMIT $1`,
      [limit],
    );
    return result.rows;
  }

  const store = await readStore();
  return [...store.activityLog]
    .sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime())
    .slice(0, limit)
    .map((entry) => {
      const user = store.users.find((item) => item.id === entry.user_id);
      return {
        ...entry,
        email: user?.email || "",
        name: user?.name || "",
      };
    });
}

function countAgendaEvents(agendaStore = {}) {
  return Object.values(agendaStore || {}).reduce((total, day) => {
    return total + (Array.isArray(day?.events) ? day.events.length : 0);
  }, 0);
}

function buildAdminStorageSummary(records = []) {
  const normalizedRecords = Array.isArray(records) ? records : [];
  const latestRecord = normalizedRecords[0] || null;
  const appStateRecord = normalizedRecords.find(
    (item) => item.data_type === "app_state" && item.data_key === "main",
  );
  const appState = appStateRecord?.data_value && typeof appStateRecord.data_value === "object"
    ? appStateRecord.data_value
    : null;

  return {
    totalRecords: normalizedRecords.length,
    lastCloudSyncAt: latestRecord?.updated_at || latestRecord?.last_updated || null,
    hasSavedData: normalizedRecords.length > 0,
    hasAppState: Boolean(appState),
    syncSource: isUsingDatabase ? "Neon / PostgreSQL" : "Fallback local",
    appStateSnapshot: appState
      ? {
          tasks: Array.isArray(appState.tasks) ? appState.tasks.length : 0,
          agendaDays: appState.agendaStore ? Object.keys(appState.agendaStore).length : 0,
          agendaEvents: countAgendaEvents(appState.agendaStore),
          financeRecords: Array.isArray(appState.financeStore?.records)
            ? appState.financeStore.records.length
            : 0,
          dreamImages: Array.isArray(appState.dreamImages) ? appState.dreamImages.length : 0,
          plannerDreamImages: Array.isArray(appState.plannerDreamImages)
            ? appState.plannerDreamImages.length
            : 0,
          modules: appState.moduleStore ? Object.keys(appState.moduleStore).length : 0,
          plannerBoards: appState.plannerBoardStore
            ? Object.keys(appState.plannerBoardStore).length
            : 0,
        }
      : null,
    recentRecords: normalizedRecords.slice(0, 8).map((item) => ({
      data_type: item.data_type || "app_state",
      data_key: item.data_key || "main",
      updated_at: item.updated_at || item.last_updated || null,
    })),
  };
}

async function getUserAdminDetail(userId) {
  if (isUsingDatabase) {
    const [userResult, dataResult, activityResult, recordResult] = await Promise.all([
      query(
        `SELECT id, name, email, role, avatar_url, subscription_url, subscription_active, subscription_status, subscription_expires, created_at, updated_at
         FROM users WHERE id = $1 LIMIT 1`,
        [userId],
      ),
      query(
        `SELECT data_type, COUNT(*)::INTEGER AS count, MAX(updated_at) AS last_updated
         FROM app_data
         WHERE user_id = $1
         GROUP BY data_type
         ORDER BY data_type ASC`,
        [userId],
      ),
      query(
        `SELECT action, details, created_at
         FROM activity_log
         WHERE user_id = $1
         ORDER BY created_at DESC
         LIMIT 12`,
        [userId],
      ),
      query(
        `SELECT data_type, data_key, data_value, updated_at
         FROM app_data
         WHERE user_id = $1
         ORDER BY updated_at DESC
         LIMIT 12`,
        [userId],
      ),
    ]);

    return {
      user: userResult.rows[0] || null,
      dataTypes: dataResult.rows,
      activity: activityResult.rows,
      storageSummary: buildAdminStorageSummary(recordResult.rows),
    };
  }

  const store = await readStore();
  const user = store.users.find((entry) => Number(entry.id) === Number(userId)) || null;
  const records = [...store.appData]
    .filter((item) => Number(item.user_id) === Number(userId))
    .sort((a, b) => new Date(b.updated_at || 0).getTime() - new Date(a.updated_at || 0).getTime());
  const dataTypes = Object.values(
    records
      .reduce((acc, item) => {
        const current = acc[item.data_type] || {
          data_type: item.data_type,
          count: 0,
          last_updated: null,
        };
        current.count += 1;
        current.last_updated =
          !current.last_updated ||
          new Date(item.updated_at || 0).getTime() > new Date(current.last_updated || 0).getTime()
            ? item.updated_at
            : current.last_updated;
        acc[item.data_type] = current;
        return acc;
      }, {}),
  );
  const activity = [...store.activityLog]
    .filter((item) => Number(item.user_id) === Number(userId))
    .sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime())
    .slice(0, 12);

  return {
    user,
    dataTypes,
    activity,
    storageSummary: buildAdminStorageSummary(records),
  };
}

async function updateUserAdminControls(userId, payload = {}) {
  const nextRole = payload.role === "admin" ? "admin" : "user";
  const nextStatus = String(
    payload.subscriptionStatus ||
      (payload.subscriptionActive ? "active" : "inactive"),
  ).toLowerCase();
  const nextActive =
    typeof payload.subscriptionActive === "boolean"
      ? payload.subscriptionActive
      : nextStatus === "active";
  let nextExpires = payload.subscriptionExpires || null;
  const nextSubscriptionUrl = String(payload.subscriptionUrl || "").trim();

  if (nextStatus === "active") {
    const expiresTime = nextExpires ? new Date(nextExpires).getTime() : NaN;
    if (!nextExpires || Number.isNaN(expiresTime) || expiresTime < Date.now()) {
      nextExpires = null;
    }
  }

  if (isUsingDatabase) {
    const result = await query(
      `UPDATE users
       SET role = $1,
           subscription_active = $2,
           subscription_status = $3,
           subscription_expires = $4,
           subscription_url = COALESCE(NULLIF($5, ''), subscription_url),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $6
       RETURNING *`,
      [nextRole, nextActive, nextStatus, nextExpires, nextSubscriptionUrl, userId],
    );
    return result.rows[0] || null;
  }

  const store = await readStore();
  const user = store.users.find((entry) => Number(entry.id) === Number(userId));
  if (!user) {
    return null;
  }

  user.role = nextRole;
  user.subscription_active = nextActive;
  user.subscription_status = nextStatus;
  user.subscription_expires = nextExpires;
  user.subscription_url = nextSubscriptionUrl || user.subscription_url || "";
  user.updated_at = new Date().toISOString();
  await writeStore(store);
  return user;
}

async function findUserForKiwifyEvent({ email, customerId, subscriptionId }) {
  if (isUsingDatabase) {
    const result = await query(
      `SELECT * FROM users
       WHERE email = $1
          OR (kiwify_customer_id IS NOT NULL AND kiwify_customer_id = $2)
          OR (kiwify_subscription_id IS NOT NULL AND kiwify_subscription_id = $3)
       LIMIT 1`,
      [email || "", customerId || "", subscriptionId || ""],
    );

    return result.rows[0] || null;
  }

  const store = await readStore();
  return (
    store.users.find(
      (user) =>
        (email && user.email === email) ||
        (customerId && user.kiwify_customer_id === customerId) ||
        (subscriptionId && user.kiwify_subscription_id === subscriptionId),
    ) || null
  );
}

async function updateSubscriptionFromKiwify(userId, details) {
  const nextStatus = String(details.subscriptionStatus || "pending").toLowerCase();
  const nextActive = nextStatus === "active";
  const nextExpires = details.expiresAt || null;

  if (isUsingDatabase) {
    const result = await query(
      `UPDATE users
       SET subscription_active = $1,
           subscription_status = $2,
           subscription_expires = $3,
           subscription_url = COALESCE(NULLIF($4, ''), subscription_url),
           kiwify_customer_id = COALESCE(NULLIF($5, ''), kiwify_customer_id),
           kiwify_subscription_id = COALESCE(NULLIF($6, ''), kiwify_subscription_id),
           kiwify_product_id = COALESCE(NULLIF($7, ''), kiwify_product_id),
           kiwify_order_id = COALESCE(NULLIF($8, ''), kiwify_order_id),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $9
       RETURNING *`,
      [
        nextActive,
        nextStatus,
        nextExpires,
        details.subscriptionUrl || "",
        details.customerId || "",
        details.subscriptionId || "",
        details.productId || "",
        details.orderId || "",
        userId,
      ],
    );
    return result.rows[0] || null;
  }

  const store = await readStore();
  const user = store.users.find((entry) => entry.id === userId);
  if (!user) {
    return null;
  }

  user.subscription_active = nextActive;
  user.subscription_status = nextStatus;
  user.subscription_expires = nextExpires;
  user.subscription_url = details.subscriptionUrl || user.subscription_url || "";
  user.kiwify_customer_id = details.customerId || user.kiwify_customer_id || "";
  user.kiwify_subscription_id = details.subscriptionId || user.kiwify_subscription_id || "";
  user.kiwify_product_id = details.productId || user.kiwify_product_id || "";
  user.kiwify_order_id = details.orderId || user.kiwify_order_id || "";
  user.updated_at = new Date().toISOString();
  await writeStore(store);
  return user;
}

function verifyKiwifyWebhook(req) {
  if (!KIWIFY_WEBHOOK_TOKEN) {
    return false;
  }

  const candidate = pickFirstString([
    req.headers["x-kiwify-token"],
    req.headers["x-webhook-token"],
    req.headers.authorization?.replace(/^Bearer\s+/i, ""),
    req.query?.token,
    req.body?.token,
  ]);

  return candidate === KIWIFY_WEBHOOK_TOKEN;
}

function mapKiwifyTriggerToSubscriptionStatus(trigger) {
  switch (trigger) {
    case "compra_aprovada":
    case "subscription_renewed":
      return "active";
    case "subscription_late":
      return "late";
    case "subscription_canceled":
    case "compra_reembolsada":
    case "chargeback":
      return "inactive";
    default:
      return "pending";
  }
}

async function requireAuthorizedUser(token, options = {}) {
  if (!token) {
    const error = new Error("Token não fornecido");
    error.status = 401;
    throw error;
  }

  const decoded = getTokenPayload(token);
  const user = await getUserWithPasswordById(decoded.id);

  if (!user) {
    const error = new Error("Usuário não encontrado");
    error.status = 401;
    throw error;
  }

  if (options.requireActiveSubscription && !isSubscriptionActive(user)) {
    // Admin sempre tem acesso mesmo sem assinatura ativa
    if (getUserRole(user.email, user.role) !== "admin") {
      const error = new Error("Assinatura inativa. Atualize sua assinatura para continuar.");
      error.status = 403;
      error.user = buildPublicUser(user);
      throw error;
    }
  }

  if (options.requireAdmin && getUserRole(user.email, user.role) !== "admin") {
    const error = new Error("Acesso restrito ao administrador.");
    error.status = 403;
    error.user = buildPublicUser(user);
    throw error;
  }

  return { decoded, user };
}

async function deleteUserAccount(userId) {
  if (isUsingDatabase) {
    await query(`DELETE FROM users WHERE id = $1`, [userId]);
    return;
  }

  const store = await readStore();
  store.users = store.users.filter((user) => user.id !== userId);
  store.appData = store.appData.filter((item) => item.user_id !== userId);
  store.activityLog = store.activityLog.filter((item) => item.user_id !== userId);
  await writeStore(store);
}

app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    const normalizedEmail = normalizeEmail(email);

    if (!name || !normalizedEmail || !password) {
      return res.status(400).json({ error: "Campos obrigatórios faltando" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Senhas não correspondem" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Senha deve ter no mínimo 6 caracteres" });
    }

    if (await emailInUse(normalizedEmail)) {
      return res.status(400).json({ error: "Email já cadastrado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser({
      name: String(name).trim(),
      email: normalizedEmail,
      password: hashedPassword,
      avatarUrl: "",
      subscriptionUrl: "",
    });

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      JWT_SECRET,
      { expiresIn: "30d" },
    );

    await logActivity(user.id, "user_registered", `Novo usuário registrado: ${user.name}`);

    res.status(201).json({
      success: true,
      message: "Cadastro realizado com sucesso!",
      token,
      user: buildPublicUser(user),
      storageMode: isUsingDatabase ? "neon" : "fallback",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro no servidor" });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, login, password } = req.body;
    const loginIdentifier = String(email || login || "").trim();
    const normalizedEmail = resolveLoginIdentifier(loginIdentifier);

    if (!loginIdentifier || !password) {
      return res
        .status(400)
        .json({ error: "Login e senha sao obrigatorios" });
    }

    const user = await findUserByEmail(normalizedEmail);
    if (!user) {
      return res.status(401).json({ error: "Email ou senha incorretos" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: "Email ou senha incorretos" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      JWT_SECRET,
      { expiresIn: "30d" },
    );

    await updateUserLastSeenDevice(user.id, req.headers["user-agent"] || "");
    const refreshedUser = await getUserWithPasswordById(user.id);

    await logActivity(
      user.id,
      "user_login",
      `Login realizado às ${new Date().toISOString()}`,
    );

    res.json({
      success: true,
      message: "Login realizado com sucesso!",
      token,
      user: {
        ...buildPublicUser(refreshedUser || user),
      },
      storageMode: isUsingDatabase ? "neon" : "fallback",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro no servidor" });
  }
});

app.post("/api/auth/verify", async (req, res) => {
  try {
    const { token } = req.body;
    const { user } = await requireAuthorizedUser(token);
    await updateUserLastSeenDevice(user.id, req.headers["user-agent"] || "");
    const refreshedUser = await getUserWithPasswordById(user.id);

    res.json({
      success: true,
      user: buildPublicUser(refreshedUser || user),
      storageMode: isUsingDatabase ? "neon" : "fallback",
    });
  } catch (error) {
    res.status(401).json({ error: "Token inválido ou expirado" });
  }
});

app.post("/api/auth/logout", async (req, res) => {
  try {
    const { token } = req.body;
    const decoded = getTokenPayload(token);
    await logActivity(
      decoded.id,
      "user_logout",
      `Logout realizado às ${new Date().toISOString()}`,
    );
    res.json({ success: true, message: "Logout realizado com sucesso!" });
  } catch (error) {
    res.json({ success: true });
  }
});

app.post("/api/data/save", async (req, res) => {
  try {
    const { token, dataType, dataKey, dataValue } = req.body;
    const { decoded } = await requireAuthorizedUser(token, { requireActiveSubscription: true });

    await saveUserData(decoded.id, dataType, dataKey, dataValue);

    res.json({
      success: true,
      message: "Dados salvos com sucesso!",
      storageMode: isUsingDatabase ? "neon" : "fallback",
    });
  } catch (error) {
    console.error(error);
    res.status(error.status || 401).json({
      error: error.message || "Não autorizado",
      user: error.user || null,
    });
  }
});

app.post("/api/data/get", async (req, res) => {
  try {
    const { token, dataType } = req.body;
    const { decoded } = await requireAuthorizedUser(token, { requireActiveSubscription: true });
    const data = await getUserData(decoded.id, dataType);

    res.json({
      success: true,
      data,
      storageMode: isUsingDatabase ? "neon" : "fallback",
    });
  } catch (error) {
    console.error(error);
    res.status(error.status || 401).json({
      error: error.message || "Não autorizado",
      user: error.user || null,
    });
  }
});

app.post("/api/user/update", async (req, res) => {
  try {
    const { token, name, email, password, avatarUrl, subscriptionUrl } = req.body;
    const decoded = getTokenPayload(token);
    const normalizedEmail = normalizeEmail(email);

    if (password && password.length < 6) {
      return res
        .status(400)
        .json({ error: "Senha deve ter no mínimo 6 caracteres" });
    }

    if (normalizedEmail && (await emailInUse(normalizedEmail, decoded.id))) {
      return res.status(400).json({ error: "Este email já está em uso." });
    }

    const hashedPassword = password ? await bcrypt.hash(password, 10) : null;
    const user = await updateUserProfile(decoded.id, {
      name,
      email: normalizedEmail,
      password: hashedPassword,
      avatarUrl,
      subscriptionUrl,
    });

    if (!user) {
      return res.json({ success: true, message: "Nada para atualizar." });
    }

    res.json({
      success: true,
      message: "Perfil atualizado com sucesso!",
      user: buildPublicUser(user),
      storageMode: isUsingDatabase ? "neon" : "fallback",
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "Não autorizado" });
  }
});

app.post("/api/billing/kiwify/webhook", async (req, res) => {
  try {
    if (!verifyKiwifyWebhook(req)) {
      return res.status(401).json({ error: "Webhook nao autorizado" });
    }

    const webhookData = extractKiwifyPayload(req.body || {});
    if (!webhookData.email) {
      return res.status(400).json({ error: "Nao foi possivel identificar o email da cliente." });
    }

    if (KIWIFY_PRODUCT_ID && webhookData.productId && webhookData.productId !== KIWIFY_PRODUCT_ID) {
      return res.json({ success: true, ignored: true, reason: "Produto diferente do configurado" });
    }

    const user = await findUserForKiwifyEvent(webhookData);
    if (!user) {
      return res.status(404).json({ error: "Usuario nao encontrado para este evento da Kiwify." });
    }

    const updatedUser = await updateSubscriptionFromKiwify(user.id, {
      subscriptionStatus: mapKiwifyTriggerToSubscriptionStatus(webhookData.eventType),
      expiresAt: webhookData.expiresAt,
      subscriptionUrl: user.subscription_url || KIWIFY_CHECKOUT_URL || "",
      customerId: webhookData.customerId,
      subscriptionId: webhookData.subscriptionId,
      productId: webhookData.productId,
      orderId: webhookData.orderId,
    });

    await logActivity(
      user.id,
      "kiwify_webhook",
      `Evento ${webhookData.eventType || "desconhecido"} processado para ${webhookData.email}`,
    );

    res.json({
      success: true,
      user: buildPublicUser(updatedUser || user),
    });
  } catch (error) {
    console.error("Erro ao processar webhook da Kiwify:", error);
    res.status(500).json({ error: "Falha ao processar webhook da Kiwify." });
  }
});

app.post("/api/admin/summary", async (req, res) => {
  try {
    const { token } = req.body;
    await requireAuthorizedUser(token, { requireAdmin: true });

    res.json({
      success: true,
      summary: await getAdminSummary(),
      storageMode: isUsingDatabase ? "neon" : "fallback",
    });
  } catch (error) {
    console.error(error);
    res.status(error.status || 401).json({
      error: error.message || "Nao autorizado",
      user: error.user || null,
    });
  }
});

app.post("/api/admin/users", async (req, res) => {
  try {
    const { token } = req.body;
    await requireAuthorizedUser(token, { requireAdmin: true });

    const users = (await listUsersForAdmin()).map((user) => ({
      ...buildPublicUser(user),
      created_at: user.created_at || null,
      updated_at: user.updated_at || null,
      data_entries: Number(user.data_entries || 0),
      last_activity_at: user.last_activity_at || null,
    }));

    res.json({
      success: true,
      users,
      storageMode: isUsingDatabase ? "neon" : "fallback",
    });
  } catch (error) {
    console.error(error);
    res.status(error.status || 401).json({
      error: error.message || "Nao autorizado",
      user: error.user || null,
    });
  }
});

app.post("/api/admin/activity", async (req, res) => {
  try {
    const { token } = req.body;
    await requireAuthorizedUser(token, { requireAdmin: true });

    res.json({
      success: true,
      activity: await getRecentAdminActivity(),
      storageMode: isUsingDatabase ? "neon" : "fallback",
    });
  } catch (error) {
    console.error(error);
    res.status(error.status || 401).json({
      error: error.message || "Nao autorizado",
      user: error.user || null,
    });
  }
});

app.post("/api/admin/users/detail", async (req, res) => {
  try {
    const { token, userId } = req.body;
    await requireAuthorizedUser(token, { requireAdmin: true });

    const detail = await getUserAdminDetail(Number(userId));
    if (!detail.user) {
      return res.status(404).json({ error: "Usuaria nao encontrada." });
    }

    res.json({
      success: true,
      detail: {
        user: buildPublicUser(detail.user),
        dataTypes: detail.dataTypes || [],
        activity: detail.activity || [],
        storageSummary: detail.storageSummary || {},
      },
      storageMode: isUsingDatabase ? "neon" : "fallback",
    });
  } catch (error) {
    console.error(error);
    res.status(error.status || 401).json({
      error: error.message || "Nao autorizado",
      user: error.user || null,
    });
  }
});

app.post("/api/admin/users/impersonate", async (req, res) => {
  try {
    const { token, userId } = req.body;
    const { user: adminUser } = await requireAuthorizedUser(token, { requireAdmin: true });

    const targetUser = await getUserWithPasswordById(Number(userId));
    if (!targetUser) {
      return res.status(404).json({ error: "Usuaria nao encontrada." });
    }

    const targetPublicUser = buildPublicUser(targetUser);
    const impersonationToken = jwt.sign(
      { id: targetUser.id, email: targetUser.email, name: targetUser.name },
      JWT_SECRET,
      { expiresIn: "12h" },
    );

    await logActivity(
      adminUser.id,
      "admin_impersonation",
      `Admin entrou no app da usuaria ${targetUser.email}`,
    );

    res.json({
      success: true,
      token: impersonationToken,
      user: targetPublicUser,
      admin: buildPublicUser(adminUser),
      storageMode: isUsingDatabase ? "neon" : "fallback",
    });
  } catch (error) {
    console.error(error);
    res.status(error.status || 401).json({
      error: error.message || "Nao autorizado",
      user: error.user || null,
    });
  }
});

app.post("/api/admin/users/update", async (req, res) => {
  try {
    const { token, userId, role, subscriptionStatus, subscriptionActive, subscriptionExpires, subscriptionUrl } = req.body;
    const { user: adminUser } = await requireAuthorizedUser(token, { requireAdmin: true });

    const targetUser = await getUserWithPasswordById(Number(userId));
    if (!targetUser) {
      return res.status(404).json({ error: "Usuaria nao encontrada." });
    }

    if (Number(targetUser.id) === Number(adminUser.id) && role !== "admin") {
      return res.status(400).json({ error: "O login admin principal nao pode perder o acesso de administrador." });
    }

    const updatedUser = await updateUserAdminControls(Number(userId), {
      role,
      subscriptionStatus,
      subscriptionActive,
      subscriptionExpires,
      subscriptionUrl,
    });

    await logActivity(
      adminUser.id,
      "admin_user_update",
      `Admin atualizou usuaria ${targetUser.email} para status ${subscriptionStatus || "mantido"}`,
    );

    res.json({
      success: true,
      user: buildPublicUser(updatedUser || targetUser),
      summary: await getAdminSummary(),
      storageMode: isUsingDatabase ? "neon" : "fallback",
    });
  } catch (error) {
    console.error(error);
    res.status(error.status || 401).json({
      error: error.message || "Nao autorizado",
      user: error.user || null,
    });
  }
});

app.post("/api/admin/users/create", async (req, res) => {
  try {
    const { token, name, email, password, subscriptionUrl } = req.body;
    const { user: adminUser } = await requireAuthorizedUser(token, { requireAdmin: true });
    const normalizedEmail = normalizeEmail(email);

    if (!name || !normalizedEmail || !password) {
      return res.status(400).json({ error: "Preencha nome, email e senha da usuaria." });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: "A senha inicial precisa ter no minimo 6 caracteres." });
    }

    if (await emailInUse(normalizedEmail)) {
      return res.status(400).json({ error: "Este email ja esta cadastrado." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = await createUser({
      name: String(name).trim(),
      email: normalizedEmail,
      password: hashedPassword,
      avatarUrl: "",
      subscriptionUrl: String(subscriptionUrl || "").trim(),
    });

    await logActivity(
      adminUser.id,
      "admin_user_create",
      `Admin cadastrou a usuaria ${createdUser.email}`,
    );

    res.json({
      success: true,
      user: buildPublicUser(createdUser),
      summary: await getAdminSummary(),
      storageMode: isUsingDatabase ? "neon" : "fallback",
    });
  } catch (error) {
    console.error(error);
    res.status(error.status || 401).json({
      error: error.message || "Nao autorizado",
      user: error.user || null,
    });
  }
});

app.post("/api/admin/users/delete", async (req, res) => {
  try {
    const { token, userId } = req.body;
    const { user: adminUser } = await requireAuthorizedUser(token, { requireAdmin: true });

    const targetUser = await getUserWithPasswordById(Number(userId));
    if (!targetUser) {
      return res.status(404).json({ error: "Usuaria nao encontrada." });
    }

    if (Number(targetUser.id) === Number(adminUser.id)) {
      return res.status(400).json({ error: "O administrador logado nao pode excluir a propria conta." });
    }

    if (normalizeEmail(targetUser.email) === ADMIN_EMAIL) {
      return res.status(400).json({ error: "A conta principal de administrador nao pode ser excluida." });
    }

    await deleteUserAccount(Number(userId));
    await logActivity(
      adminUser.id,
      "admin_user_delete",
      `Admin excluiu a usuaria ${targetUser.email}`,
    );

    res.json({
      success: true,
      summary: await getAdminSummary(),
      storageMode: isUsingDatabase ? "neon" : "fallback",
    });
  } catch (error) {
    console.error(error);
    res.status(error.status || 401).json({
      error: error.message || "Nao autorizado",
      user: error.user || null,
    });
  }
});

app.post("/api/user/delete", async (req, res) => {
  try {
    const { token, password } = req.body;
    const decoded = getTokenPayload(token);
    const user = await getUserWithPasswordById(decoded.id);

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: "Senha incorreta" });
    }

    await deleteUserAccount(decoded.id);

    res.json({
      success: true,
      message: "Conta deletada permanentemente!",
      storageMode: isUsingDatabase ? "neon" : "fallback",
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "Não autorizado" });
  }
});

app.get("/api/config", (req, res) => {
  res.json({
    checkoutUrl: KIWIFY_CHECKOUT_URL || "",
    checkoutUrlAnnual: KIWIFY_CHECKOUT_URL_ANNUAL || KIWIFY_CHECKOUT_URL || "",
    monthlyPrice: MONTHLY_SUBSCRIPTION_PRICE,
    annualPrice: ANNUAL_SUBSCRIPTION_PRICE,
    vapidPublicKey: VAPID_PUBLIC_KEY,
  });
});

app.get("/api/push/vapid-key", (req, res) => {
  res.json({ publicKey: VAPID_PUBLIC_KEY });
});

app.post("/api/push/subscribe", async (req, res) => {
  try {
    const { endpoint, keys } = req.body;
    if (!endpoint || !keys?.p256dh || !keys?.auth) {
      return res.status(400).json({ error: "Dados de assinatura incompletos." });
    }
    await savePushSubscription(endpoint, keys.p256dh, keys.auth);
    res.json({ success: true });
  } catch (error) {
    console.error("Erro ao salvar push subscription:", error);
    res.status(500).json({ error: "Erro ao registrar notificações." });
  }
});

app.post("/api/push/unsubscribe", async (req, res) => {
  try {
    const { endpoint } = req.body;
    if (!endpoint) return res.status(400).json({ error: "Endpoint obrigatório." });
    await removePushSubscription(endpoint);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Erro ao cancelar notificações." });
  }
});

app.post("/api/push/send", async (req, res) => {
  try {
    const { token, title, body, url } = req.body;
    await requireAuthorizedUser(token, { requireAdmin: true });

    if (!title || !body) {
      return res.status(400).json({ error: "Título e mensagem são obrigatórios." });
    }

    const result = await sendPushToAll(title, body, url || "/");
    res.json({ success: true, ...result });
  } catch (error) {
    res.status(error.status || 401).json({ error: error.message || "Não autorizado." });
  }
});

app.get("/api/health", async (req, res) => {
  try {
    if (isUsingDatabase) {
      await query("SELECT 1");
    } else {
      await ensureFallbackFile();
    }

    res.json({
      status: "ok",
      message: isUsingDatabase
        ? "Servidor Vida Nova funcionando com Neon/Postgres!"
        : "Servidor Vida Nova funcionando em modo fallback local.",
      storageMode: isUsingDatabase ? "neon" : "fallback",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Falha na conexão com o banco de dados.",
    });
  }
});

function startKeepAlive() {
  const selfUrl = process.env.RENDER_EXTERNAL_URL || process.env.SELF_URL || null;
  if (!selfUrl) return;

  const mod = selfUrl.startsWith("https") ? require("https") : require("http");
  setInterval(() => {
    mod.get(`${selfUrl}/api/health`, (res) => {
      res.resume();
    }).on("error", () => {});
  }, 14 * 60 * 1000);

  console.log(`Keep-alive ativo: pingando ${selfUrl}/api/health a cada 14 min`);
}

async function stampVersionFile() {
  const versionPath = path.join(__dirname, "version.json");
  const stamp = { version: "auto", buildTime: new Date().toISOString() };
  try {
    await fsp.writeFile(versionPath, JSON.stringify(stamp) + "\n", "utf8");
    console.log("version.json atualizado:", stamp.buildTime);
  } catch (e) {
    console.error("Erro ao gravar version.json:", e.message);
  }
}

async function startServer() {
  try {
    await stampVersionFile();
    await initDb();
    await ensureAdminUser();
    app.listen(PORT, () => {
      console.log(`Servidor Vida Nova rodando na porta ${PORT}`);
      console.log(
        isUsingDatabase
          ? "Banco de dados: Neon / PostgreSQL"
          : `Banco de dados: fallback local em ${DATA_FILE}`,
      );
      if (ADMIN_EMAIL) {
        console.log(`Admin principal configurado para ${ADMIN_EMAIL}`);
      }
      startKeepAlive();
      startYouTubePolling();
    });
  } catch (error) {
    console.error("Erro ao iniciar servidor:", error);
    process.exit(1);
  }
}

process.on("SIGINT", async () => {
  if (pool) {
    await pool.end();
  }
  console.log("Conexão com banco encerrada.");
  process.exit(0);
});

// Vercel serverless: export app; local: start HTTP server
if (process.env.VERCEL) {
  initDb()
    .then(() => ensureAdminUser())
    .catch((err) => console.error("Erro ao iniciar (serverless):", err.message));
  module.exports = app;
} else {
  startServer();
}
