import { Duration } from 'luxon';

export const durationToDisplayString = (duration: Duration) => {
  const durationInSeconds = Math.abs(Math.floor(duration.as('seconds')));

  if (durationInSeconds < 60) return `${durationInSeconds}s`;

  const durationInMinutes = Math.abs(Math.floor(duration.as('minutes')));
  const min = durationInMinutes % 60;
  const durationInHours = (durationInMinutes - min) / 60;

  if (durationInHours === 0) return `${min}m`;

  const hours = durationInHours % 24;
  const durationInDays = (durationInHours - hours) / 24;

  if (durationInDays === 0) return `${hours}h ${min}m`;

  return `${durationInDays}d ${hours}h ${min}m`;
};
