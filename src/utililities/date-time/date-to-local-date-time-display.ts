import { DateTime } from 'luxon';

export const dateToLocalDateTimeDisplay = (date: Date) => {
  const dateTime = DateTime.fromJSDate(date);
  return dateTime.toLocaleString({
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
};
