import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, signIn } from './lib/firebase';
import { CalendarView } from './types';
import CalendarHeader from './components/CalendarHeader';
import Sidebar from './components/Sidebar';
import MonthView from './components/MonthView';
import WeekView from './components/WeekView';
import DayView from './components/DayView';
import EventModal from './components/EventModal';
import { CalendarEvent } from './types';
import { 
  collection, 
  query, 
  where, 
  onSnapshot, 
  Timestamp 
} from 'firebase/firestore';
import { db } from './lib/firebase';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, subDays } from 'date-fns';
import { Loader2, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<CalendarView>('month');
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInitialDate, setModalInitialDate] = useState<Date | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!user) {
      setEvents([]);
      return;
    }

    const q = query(
      collection(db, 'events'),
      where('userId', '==', user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedEvents = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          ...data,
          id: doc.id,
          start: (data.start as Timestamp).toDate(),
          end: (data.end as Timestamp).toDate(),
          createdAt: (data.createdAt as Timestamp).toDate(),
          updatedAt: (data.updatedAt as Timestamp).toDate(),
        } as CalendarEvent;
      });
      setEvents(fetchedEvents);
    }, (error) => {
      console.error("Firestore Error:", error);
    });

    return unsubscribe;
  }, [user]);

  const handlePrev = () => {
    if (view === 'month') {
      setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    } else if (view === 'week') {
      setCurrentDate(prev => subDays(prev, 7));
    } else {
      setCurrentDate(prev => subDays(prev, 1));
    }
  };

  const handleNext = () => {
    if (view === 'month') {
      setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
    } else if (view === 'week') {
      setCurrentDate(prev => addDays(prev, 7));
    } else {
      setCurrentDate(prev => addDays(prev, 1));
    }
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const openAddModal = (date?: Date) => {
    setSelectedEvent(null);
    setModalInitialDate(date || new Date());
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-white">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6 max-w-md"
        >
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3">
              <Plus className="text-white w-10 h-10" />
            </div>
          </div>
          <h1 className="font-sans text-4xl font-bold text-gray-900 tracking-tight">Super Calendar</h1>
          <p className="text-gray-500">A sua agenda completa, sincronizada em todos os seus dispositivos. Organize seu tempo com eficiência.</p>
          <button 
            onClick={signIn}
            className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all shadow-md active:scale-[0.98]"
          >
            Entrar com Google
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-white overflow-hidden font-sans">
      <CalendarHeader 
        currentDate={currentDate}
        view={view}
        setView={setView}
        onPrev={handlePrev}
        onNext={handleNext}
        onToday={handleToday}
        user={user}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar 
          isOpen={isSidebarOpen} 
          currentDate={currentDate} 
          setCurrentDate={setCurrentDate}
          onAddEvent={() => openAddModal()}
        />
        
        <main className="flex-1 overflow-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${view}-${currentDate.getTime()}`}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {view === 'month' && (
                <MonthView 
                  currentDate={currentDate} 
                  events={events} 
                  onDateClick={openAddModal}
                  onEventClick={(e) => {
                    setSelectedEvent(e);
                    setIsModalOpen(true);
                  }}
                />
              )}
              {view === 'week' && (
                <WeekView 
                  currentDate={currentDate} 
                  events={events}
                  onTimeClick={openAddModal}
                  onEventClick={(e) => {
                    setSelectedEvent(e);
                    setIsModalOpen(true);
                  }}
                />
              )}
              {view === 'day' && (
                <DayView 
                  currentDate={currentDate} 
                  events={events}
                  onTimeClick={openAddModal}
                  onEventClick={(e) => {
                    setSelectedEvent(e);
                    setIsModalOpen(true);
                  }}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* FAB on mobile */}
        <button 
          onClick={() => openAddModal()}
          className="md:hidden fixed right-6 bottom-6 w-14 h-14 bg-white rounded-full shadow-xl flex items-center justify-center text-blue-600 border border-gray-100 z-50 transition-transform active:scale-95"
        >
          <Plus size={28} />
        </button>
      </div>

      <EventModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        event={selectedEvent}
        initialDate={modalInitialDate}
        userId={user.uid}
      />
    </div>
  );
}
