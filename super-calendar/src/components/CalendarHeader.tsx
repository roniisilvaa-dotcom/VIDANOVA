import { User } from 'firebase/auth';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { 
  ChevronLeft, 
  ChevronRight, 
  Menu, 
  Search, 
  Settings, 
  HelpCircle,
  Calendar as CalendarIcon
} from 'lucide-react';
import { CalendarView } from '../types';
import { auth } from '../lib/firebase';

interface Props {
  currentDate: Date;
  view: CalendarView;
  setView: (view: CalendarView) => void;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
  user: User;
  toggleSidebar: () => void;
}

export default function CalendarHeader({ 
  currentDate, 
  view, 
  setView, 
  onPrev, 
  onNext, 
  onToday, 
  user,
  toggleSidebar
}: Props) {
  const views: { id: CalendarView; label: string }[] = [
    { id: 'day', label: 'Dia' },
    { id: 'week', label: 'Semana' },
    { id: 'month', label: 'Mês' },
  ];

  return (
    <header className="h-16 flex items-center justify-between px-4 border-bottom border-gray-200 bg-white z-40">
      <div className="flex items-center space-x-2 md:space-x-4">
        <button 
          onClick={toggleSidebar}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors hidden md:block"
        >
          <Menu size={20} />
        </button>
        
        <div className="flex items-center space-x-2">
          <CalendarIcon className="text-blue-600 hidden sm:block" size={24} />
          <h1 className="text-xl font-medium text-gray-700 hidden sm:block">Agenda</h1>
        </div>

        <div className="flex items-center space-x-2 ml-4">
          <button 
            onClick={onToday}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            Hoje
          </button>
          
          <div className="flex items-center">
            <button onClick={onPrev} className="p-2 hover:bg-gray-100 rounded-full">
              <ChevronLeft size={20} />
            </button>
            <button onClick={onNext} className="p-2 hover:bg-gray-100 rounded-full">
              <ChevronRight size={20} />
            </button>
          </div>

          <h2 className="text-xl font-medium text-gray-700 min-w-[150px] capitalize">
            {format(currentDate, 'MMMM yyyy', { locale: ptBR })}
          </h2>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <div className="hidden md:flex items-center mr-4 space-x-2">
          <button className="p-2 hover:bg-gray-100 rounded-full"><Search size={20} /></button>
          <button className="p-2 hover:bg-gray-100 rounded-full"><HelpCircle size={20} /></button>
          <button className="p-2 hover:bg-gray-100 rounded-full"><Settings size={20} /></button>
        </div>

        <select 
          value={view}
          onChange={(e) => setView(e.target.value as CalendarView)}
          className="border border-gray-300 rounded-md px-3 py-1.5 text-sm font-medium bg-white outline-none cursor-pointer hover:bg-gray-50 mr-4"
        >
          {views.map(v => (
            <option key={v.id} value={v.id}>{v.label}</option>
          ))}
        </select>

        <img 
          src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}`} 
          alt={user.displayName || 'User'} 
          className="w-8 h-8 rounded-full cursor-pointer border border-gray-200"
          onClick={() => auth.signOut()}
          title="Clique para sair"
        />
      </div>
    </header>
  );
}
