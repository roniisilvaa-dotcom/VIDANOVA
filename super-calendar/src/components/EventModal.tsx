import { useState, useEffect, type FormEvent } from 'react';
import { 
  X, 
  Clock, 
  MapPin, 
  AlignLeft, 
  Trash2, 
  Check,
  Calendar as CalendarIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { format, addHours } from 'date-fns';
import { CalendarEvent } from '../types';
import { db } from '../lib/firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, Timestamp } from 'firebase/firestore';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  event: CalendarEvent | null;
  initialDate: Date | null;
  userId: string;
}

const COLORS = [
  { name: 'Azul', value: '#1a73e8' },
  { name: 'Vermelho', value: '#d93025' },
  { name: 'Amarelo', value: '#f9ab00' },
  { name: 'Verde', value: '#188038' },
  { name: 'Roxo', value: '#a142f4' },
  { name: 'Laranja', value: '#e67c73' },
];

export default function EventModal({ isOpen, onClose, event, initialDate, userId }: Props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [color, setColor] = useState(COLORS[0].value);
  const [isAllDay, setIsAllDay] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setDescription(event.description || '');
      setLocation(event.location || '');
      setStartDate(format(event.start, 'yyyy-MM-dd'));
      setStartTime(format(event.start, 'HH:mm'));
      setEndDate(format(event.end, 'yyyy-MM-dd'));
      setEndTime(format(event.end, 'HH:mm'));
      setColor(event.color);
      setIsAllDay(event.isAllDay);
    } else if (initialDate) {
      setTitle('');
      setDescription('');
      setLocation('');
      setStartDate(format(initialDate, 'yyyy-MM-dd'));
      setStartTime(format(initialDate, 'HH:mm'));
      const end = addHours(initialDate, 1);
      setEndDate(format(end, 'yyyy-MM-dd'));
      setEndTime(format(end, 'HH:mm'));
      setColor(COLORS[0].value);
      setIsAllDay(false);
    }
  }, [event, initialDate, isOpen]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title) return;

    setLoading(true);
    try {
      const start = new Date(`${startDate}T${startTime}`);
      const end = new Date(`${endDate}T${endTime}`);

      const eventData = {
        userId,
        title,
        description,
        location,
        start: Timestamp.fromDate(start),
        end: Timestamp.fromDate(end),
        isAllDay,
        color,
        updatedAt: Timestamp.now(),
      };

      if (event) {
        await updateDoc(doc(db, 'events', event.id), eventData);
      } else {
        await addDoc(collection(db, 'events'), {
          ...eventData,
          createdAt: Timestamp.now(),
        });
      }
      onClose();
    } catch (error) {
      console.error("Error saving event:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!event) return;
    if (!confirm('Deseja excluir este evento?')) return;

    setLoading(true);
    try {
      await deleteDoc(doc(db, 'events', event.id));
      onClose();
    } catch (error) {
      console.error("Error deleting event:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="bg-white w-full max-w-md rounded-xl shadow-2xl overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-3 border-b border-gray-100 bg-gray-50">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-blue-600 rounded-lg">
                <CalendarIcon className="text-white" size={18} />
              </div>
              <span className="text-sm font-semibold text-gray-700">
                {event ? 'Editar Evento' : 'Novo Evento'}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              {event && (
                <button 
                  onClick={handleDelete}
                  className="p-2 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-full transition-colors"
                  title="Excluir"
                >
                  <Trash2 size={18} />
                </button>
              )}
              <button 
                onClick={onClose}
                className="p-2 hover:bg-gray-200 text-gray-500 rounded-full transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto max-h-[80vh]">
            {/* Title */}
            <div className="space-y-1">
              <input
                autoFocus
                type="text"
                placeholder="Adicionar título"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full text-2xl font-semibold text-gray-800 placeholder:text-gray-300 border-b-2 border-transparent focus:border-blue-600 transition-colors outline-none pb-2"
                required
              />
            </div>

            {/* Time selection */}
            <div className="space-y-4">
              <div className="flex items-start space-x-3 text-gray-600">
                <Clock className="shrink-0 mt-1" size={20} />
                <div className="flex-1 space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="px-2 py-1 border border-gray-200 rounded hover:bg-gray-50 cursor-pointer outline-none focus:border-blue-500 text-sm"
                    />
                    {!isAllDay && (
                      <input
                        type="time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        className="px-2 py-1 border border-gray-200 rounded hover:bg-gray-50 cursor-pointer outline-none focus:border-blue-500 text-sm"
                      />
                    )}
                    <span className="text-gray-400">–</span>
                    {!isAllDay && (
                      <input
                        type="time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        className="px-2 py-1 border border-gray-200 rounded hover:bg-gray-50 cursor-pointer outline-none focus:border-blue-500 text-sm"
                      />
                    )}
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="px-2 py-1 border border-gray-200 rounded hover:bg-gray-50 cursor-pointer outline-none focus:border-blue-500 text-sm"
                    />
                  </div>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={isAllDay} 
                      onChange={(e) => setIsAllDay(e.target.checked)}
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-600">Dia inteiro</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center space-x-3 text-gray-600">
              <MapPin className="shrink-0" size={20} />
              <input
                type="text"
                placeholder="Adicionar local"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full text-sm outline-none border-b border-transparent focus:border-gray-200 transition-colors py-1"
              />
            </div>

            {/* Description */}
            <div className="flex items-start space-x-3 text-gray-600">
              <AlignLeft className="shrink-0 mt-1" size={20} />
              <textarea
                placeholder="Adicionar descrição"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full text-sm outline-none border border-gray-100 focus:border-gray-300 rounded p-2 transition-colors min-h-[100px] resize-none"
              />
            </div>

            {/* Color selection */}
            <div className="flex items-center space-x-3">
              <div 
                className="w-5 h-5 rounded-full shrink-0 shadow-sm" 
                style={{ backgroundColor: color }} 
              />
              <div className="flex flex-wrap gap-2">
                {COLORS.map((c) => (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => setColor(c.value)}
                    className={`w-6 h-6 rounded-full flex items-center justify-center transition-transform hover:scale-110 active:scale-95 ${color === c.value ? 'ring-2 ring-offset-2 ring-blue-500 shadow-lg' : ''}`}
                    style={{ backgroundColor: c.value }}
                  >
                    {color === c.value && <Check size={12} className="text-white" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Footer buttons */}
            <div className="flex justify-end pt-4 space-x-3 border-t border-gray-100">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                disabled={loading}
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg shadow-md hover:shadow-lg transition-all active:scale-[0.98] disabled:bg-blue-300 flex items-center"
              >
                {loading ? 'Salvando...' : 'Salvar'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
