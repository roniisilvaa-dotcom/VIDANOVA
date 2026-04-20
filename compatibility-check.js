// Compatibilidade Check Script
// Adicione este script ao final do index.html antes de </body> para diagnosticar compatibilidade

(function checkCompatibility() {
  const checks = {
    "LocalStorage": typeof Storage !== "undefined",
    "ServiceWorker": "serviceWorker" in navigator,
    "Fetch API": typeof fetch !== "undefined",
    "Promises": typeof Promise !== "undefined",
    "Array Methods": typeof Array.prototype.map === "function",
    "Object Methods": typeof Object.assign === "function",
    "IndexedDB": typeof indexedDB !== "undefined",
    "Notification API": "Notification" in window,
    "Vibration API": "vibrate" in navigator,
    "Web Audio": typeof AudioContext !== "undefined" || typeof webkitAudioContext !== "undefined",
    "RequestAnimationFrame": typeof requestAnimationFrame !== "function",
    "CSS Grid": CSS.supports("display", "grid"),
    "CSS Flexbox": CSS.supports("display", "flex"),
    "CSS Custom Properties": CSS.supports("--test", "0"),
    "Touch Events": "ontouchstart" in window,
    "Pointer Events": "onpointerdown" in window,
    "WebGL": !!document.createElement("canvas").getContext("webgl"),
    "localStorage Size": (() => {
      try {
        const test = "__localStorage_test__";
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
      } catch (e) {
        return false;
      }
    })(),
    "Device Orientation": "onorientationchange" in window,
    "Geolocation": "geolocation" in navigator,
  };

  const results = {
    supported: [],
    unsupported: [],
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    language: navigator.language,
    online: navigator.onLine,
    cores: navigator.hardwareConcurrency,
    memory: navigator.deviceMemory,
    timestamp: new Date().toISOString(),
  };

  for (const [feature, supported] of Object.entries(checks)) {
    if (supported) {
      results.supported.push(feature);
    } else {
      results.unsupported.push(feature);
    }
  }

  // Store results
  window.__compatibilityResults = results;

  // Log to console
  if (results.unsupported.length === 0) {
    console.log("✅ Compatibilidade completa detectada");
  } else {
    console.warn("⚠️ Alguns recursos não suportados:", results.unsupported);
  }

  console.log("📊 Compatibilidade Detectada:", results);

  return results;
})();
