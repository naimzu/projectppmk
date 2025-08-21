import { format, formatDistanceToNow, isPast, isFuture, isValid } from 'date-fns';

export const formatDate = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  if (!isValid(d)) return '';
  return format(d, 'PPP');
};

export const formatDateTime = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  if (!isValid(d)) return '';
  return format(d, 'PPp');
};

export const formatRelative = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  if (!isValid(d)) return '';
  return formatDistanceToNow(d, { addSuffix: true });
};

export const isEventPast = (date: Date | string): boolean => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return isValid(d) && isPast(d);
};

export const isEventUpcoming = (date: Date | string): boolean => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return isValid(d) && isFuture(d);
};
