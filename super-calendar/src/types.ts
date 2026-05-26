export interface CalendarEvent {
  id: string;
  userId: string;
  title: string;
  description?: string;
  start: Date;
  end: Date;
  isAllDay: boolean;
  color: string;
  location?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CalendarView = 'month' | 'week' | 'day' | 'schedule';

export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
}
