import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CalendarEvent } from '../types';
import { cn } from '../lib/utils';

interface Props {
  currentDate: Date;
  events: CalendarEvent[];
  onDateClick: (date: Date) => void;
  onEventClick: (event: CalendarEvent) => void;
}

export default function MonthView({ currentDate, events, onDateClick, onEventClick }: Props) {
  const start = startOfWeek(startOfMonth(currentDate));
  const end = endOfWeek(endOfMonth(currentDate));
  const days = eachDayOfInterval({ start, end });

  const weekDays = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'];

  const getEventsForDay = (date: Date) => {
    return events.filter(event => isSameDay(event.start, date))
      .sort((a, b) => a.start.getTime() - b.start.getTime());
  };

  return (
    <div className="flex flex-col h-full border-t border-gray-200">
      <div className="grid grid-cols-7 border-b border-gray-200">
        {weekDays.map(day => (
          <div key={day} className="py-2 text-center text-[10px] uppercase font-bold text-gray-500 tracking-wider">
            {day}
          </div>
        ))}
      </div>
      
      <div className="flex-1 grid grid-cols-7 grid-rows-5 overflow-hidden">
        {days.map((day, i) => {
          const dayEvents = getEventsForDay(day);
          const isToday = isSameDay(day, new Date());
          const isCurrentMonth = isSameMonth(day, currentDate);

          return (
            <div 
              key={day.toString()} 
              className={cn(
                "border-r border-b border-gray-200 p-1 min-h-[100px] flex flex-col group hover:bg-gray-50 transition-colors",
                i % 7 === 6 && "border-r-0"
              )}
              onClick={() => onDateClick(day)}
            >
              <div className="flex justify-center mb-1">
                <span className={cn(
                  "text-xs font-medium w-7 h-7 flex items-center justify-center rounded-full mt-1 transition-colors",
                  !isCurrentMonth && "text-gray-400",
                  isToday && "bg-blue-600 text-white",
                  !isToday && isCurrentMonth && "text-gray-700 hover:bg-gray-200"
                )}>
                  {format(day, 'd')}
                </span>
              </div>
              
              <div className="flex-1 overflow-y-auto space-y-1 scrollbar-hide">
                {dayEvents.map(event => (
                  <button
                    key={event.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      onEventClick(event);
                    }}
                    className={cn(
                      "w-full text-left px-2 py-0.5 rounded text-[10px] font-medium truncate transition-opacity hover:opacity-80 active:scale-[0.98]",
                      event.color ? `bg-${event.color.replace('#', '')}/10 text-[${event.color}]` : "bg-blue-100 text-blue-700"
                    )}
                    style={{ 
                      backgroundColor: `${event.color}15`, 
                      color: event.color,
                      borderLeft: `2px solid ${event.color}`
                    }}
                  >
                    {format(event.start, 'HH:mm')} {event.title}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
