import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Plus, Check } from 'lucide-react';
import { cn } from '../lib/utils';
import { useState } from 'react';

interface Props {
  isOpen: boolean;
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
  onAddEvent: () => void;
}

export default function Sidebar({ isOpen, currentDate, setCurrentDate, onAddEvent }: Props) {
  const [miniDate, setMiniDate] = useState(new Date(currentDate));

  const start = startOfWeek(startOfMonth(miniDate));
  const end = endOfWeek(endOfMonth(miniDate));
  const days = eachDayOfInterval({ start, end });

  if (!isOpen) return null;

  return (
    <aside className="w-64 border-right border-gray-200 bg-white flex flex-col p-4 space-y-8 hidden md:flex shrink-0">
      <button 
        onClick={onAddEvent}
        className="flex items-center space-x-2 px-4 py-3 bg-white border border-gray-200 shadow-md hover:shadow-lg rounded-full transition-shadow group overflow-hidden relative"
      >
        <span className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
          <Plus className="text-blue-600" size={24} />
        </span>
        <span className="font-medium text-gray-700">Criar</span>
      </button>

      <div className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <span className="text-sm font-medium text-gray-700 capitalize">
            {format(miniDate, 'MMMM yyyy', { locale: ptBR })}
          </span>
          <div className="flex">
            <button onClick={() => setMiniDate(subMonths(miniDate, 1))} className="p-1 hover:bg-gray-100 rounded-full">
              <ChevronLeft size={16} />
            </button>
            <button onClick={() => setMiniDate(addMonths(miniDate, 1))} className="p-1 hover:bg-gray-100 rounded-full">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center">
          {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map(day => (
            <div key={day} className="text-[10px] font-bold text-gray-500 py-1">
              {day}
            </div>
          ))}
          {days.map(day => {
            const isSelected = isSameDay(day, currentDate);
            const isToday = isSameDay(day, new Date());
            const isCurrentMonth = isSameMonth(day, miniDate);
            
            return (
              <button
                key={day.toString()}
                onClick={() => setCurrentDate(day)}
                className={cn(
                  "w-7 h-7 flex items-center justify-center text-xs rounded-full transition-colors",
                  !isCurrentMonth && "text-gray-300",
                  isCurrentMonth && !isSelected && !isToday && "text-gray-700 hover:bg-gray-100",
                  isToday && !isSelected && "bg-blue-100 text-blue-700 font-bold",
                  isSelected && "bg-blue-600 text-white font-bold"
                )}
              >
                {format(day, 'd')}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="px-2 text-sm font-medium text-gray-700">Meus calendários</h3>
        <div className="space-y-2 px-2">
          <label className="flex items-center space-x-3 cursor-pointer">
            <div className="w-4 h-4 rounded bg-blue-600 flex items-center justify-center">
              <Check size={12} className="text-white" />
            </div>
            <span className="text-xs text-gray-700">Pessoal</span>
          </label>
        </div>
      </div>
    </aside>
  );
}
