import { format, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay, addHours, startOfDay } from 'date-fns';
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

export default function WeekView({ currentDate, events, onTimeClick, onEventClick }: Props) {
  const start = startOfWeek(currentDate);
  const end = endOfWeek(currentDate);
  const days = eachDayOfInterval({ start, end });
  const hours = Array.from({ length: 24 }, (_, i) => i);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to 8 AM by default
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 400; // rough estimate for 8 AM
    }
  }, []);

  const getEventsForDay = (date: Date) => {
    return events.filter(event => isSameDay(event.start, date) && !event.isAllDay);
  };

  return (
    <div className="flex flex-col h-full bg-white border-t border-gray-200">
      {/* Header */}
      <div className="flex border-b border-gray-200 sticky top-0 bg-white z-20">
        <div className="w-16 border-r border-gray-200 shrink-0" />
        <div className="flex-1 grid grid-cols-7">
          {days.map(day => {
            const isToday = isSameDay(day, new Date());
            return (
              <div key={day.toString()} className="text-center py-2 border-r border-gray-200 last:border-r-0">
                <div className="text-[10px] uppercase font-bold text-gray-500">
                  {format(day, 'EEE', { locale: ptBR })}
                </div>
                <div className={cn(
                  "text-xl flex items-center justify-center w-10 h-10 mx-auto rounded-full mt-1",
                  isToday ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"
                )}>
                  {format(day, 'd')}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Grid */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto relative scroll-smooth">
        <div className="flex min-h-[1440px]"> {/* 24h * 60px */}
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

          {/* Days columns */}
          <div className="flex-1 grid grid-cols-7 relative">
            {/* Horizontal lines */}
            <div className="absolute inset-0 pointer-events-none">
              {hours.map(hour => (
                <div key={hour} className="h-[60px] border-b border-gray-100" />
              ))}
            </div>

            {/* Vertical column contents */}
            {days.map(day => {
              const dayEvents = getEventsForDay(day);
              return (
                <div 
                  key={day.toString()} 
                  className="relative h-full border-r border-gray-200 last:border-r-0 group"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const y = e.clientY - rect.top;
                    const hour = Math.floor(y / 60);
                    const clickedDate = startOfDay(day);
                    onTimeClick(addHours(clickedDate, hour));
                  }}
                >
                  {/* Current time indicator */}
                  {isSameDay(day, new Date()) && (
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
                    const height = Math.max(durationHours * 60, 20);

                    return (
                      <button
                        key={event.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          onEventClick(event);
                        }}
                        className="absolute left-0.5 right-0.5 rounded px-1 py-0.5 text-[10px] font-medium border border-white/20 shadow-sm z-10 overflow-hidden truncate transition-all hover:scale-[1.01] active:scale-[0.99]"
                        style={{
                          top: `${top}px`,
                          height: `${height}px`,
                          backgroundColor: event.color,
                          color: 'white'
                        }}
                      >
                        <div className="font-bold">{event.title}</div>
                        <div className="opacity-80">
                          {format(event.start, 'HH:mm')} - {format(event.end, 'HH:mm')}
                        </div>
                      </button>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
