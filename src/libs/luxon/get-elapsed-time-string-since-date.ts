import { DateTime } from 'luxon';

import { durationToDisplayString } from './duration-to-display-string';

export const getElapsedTimeStringSinceDate = (
  date: number | Date | null | undefined,
  diffDate?: Date | undefined,
) => {
  if (date === null || date === undefined) return null;
  const dateTime = DateTime.fromJSDate(new Date(date));
  if (diffDate) {
    const duration = dateTime.diff(DateTime.fromJSDate(diffDate));
    return durationToDisplayString(duration);
  }
  return durationToDisplayString(dateTime.diffNow()) + ' ago';
};
