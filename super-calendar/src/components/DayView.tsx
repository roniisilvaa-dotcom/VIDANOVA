import { format, isSameDay, addHours, startOfDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CalendarEvent } from '../types';
import { cn } from '../lib/utils';
import { useEffect, useRef } from 'react';

interface Props {
  currentDate: Date;
  events: CalendarEvent[];
  onTimeClick: (date: Date) => void;
  onEventClick: (event: CalendarEvent) => void;
}

export default function DayView({ currentDate, events, onTimeClick, onEventClick }: Props) {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 400;
    }
  }, []);

  const dayEvents = events.filter(event => isSameDay(event.start, currentDate) && !event.isAllDay);

  return (
    <div className="flex flex-col h-full bg-white border-t border-gray-200">
      {/* Header */}
      <div className="flex border-b border-gray-200 sticky top-0 bg-white z-20">
        <div className="w-16 border-r border-gray-200 shrink-0" />
        <div className="flex-1 py-4 px-6">
          <div className="text-sm font-bold text-gray-500 uppercase tracking-widest">
            {format(currentDate, 'EEEE', { locale: ptBR })}
          </div>
          <div className={cn(
            "text-3xl mt-1 w-12 h-12 flex items-center justify-center rounded-full",
            isSameDay(currentDate, new Date()) ? "bg-blue-600 text-white" : "text-gray-700"
          )}>
            {format(currentDate, 'd')}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto relative scroll-smooth">
        <div className="flex min-h-[1440px]">
          {/* Time column */}
          <div className="w-16 border-r border-gray-200 shrink-0 select-none">
            {hours.map(hour => (
              <div key={hour} className="h-[60px] relative">
                {hour !== 0 && (
                  <span className="absolute -top-2 right-2 text-[10px] text-gray-400 font-medium">
                    {hour === 12 ? 'MEIO-DIA' : `${hour}:00`}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Day column */}
          <div 
            className="flex-1 relative group"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const y = e.clientY - rect.top;
              const hour = Math.floor(y / 60);
              const clickedDate = startOfDay(currentDate);
              onTimeClick(addHours(clickedDate, hour));
            }}
          >
            {/* Horizontal lines */}
            <div className="absolute inset-0 pointer-events-none">
              {hours.map(hour => (
                <div key={hour} className="h-[60px] border-b border-gray-100" />
              ))}
            </div>

            {/* Current time indicator */}
            {isSameDay(currentDate, new Date()) && (
              <div 
                className="absolute left-0 right-0 border-t-2 border-red-500 z-10 pointer-events-none"
                style={{ 
                  top: `${(new Date().getHours() * 60) + new Date().getMinutes()}px` 
                }}
              >
                <div className="absolute -left-1 -top-1 w-2 h-2 bg-red-500 rounded-full" />
              </div>
            )}

            {/* Events */}
            {dayEvents.map(event => {
              const startHour = event.start.getHours();
              const startMin = event.start.getMinutes();
              const durationHours = (event.end.getTime() - event.start.getTime()) / (1000 * 60 * 60);
              const top = (startHour * 60) + startMin;
              const height = Math.max(durationHours * 60, 40);

              return (
                <button
                  key={event.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    onEventClick(event);
                  }}
                  className="absolute left-4 right-4 rounded-lg p-3 text-sm font-medium border border-white/20 shadow-md z-10 overflow-hidden text-left transition-all hover:scale-[1.01] active:scale-[0.99]"
                  style={{
                    top: `${top}px`,
                    height: `${height}px`,
                    backgroundColor: event.color,
                    color: 'white'
                  }}
                >
                  <div className="font-bold mb-1">{event.title}</div>
                  <div className="text-xs opacity-90 flex flex-col space-y-1">
                    <span>{format(event.start, 'HH:mm')} - {format(event.end, 'HH:mm')}</span>
                    {event.location && <span className="italic truncate">{event.location}</span>}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
