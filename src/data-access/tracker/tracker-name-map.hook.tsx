import { useCallback, useMemo } from 'react';

import { Tracker, useRealmQuery } from '../models';

const getScrubbedTrackerName = (name: string) => name.trim().toLowerCase();

export const useTrackerNameMap = () => {
  const trackers = useRealmQuery<Tracker>('Tracker');

  const trackerNameMap = useMemo(() => {
    const map: Record<string, Tracker> = {};
    trackers.forEach(
      tracker => (map[getScrubbedTrackerName(tracker.name)] = tracker),
    );
    return map;
  }, [trackers]);

  const getTracker = useCallback(
    (name: string, excludedName?: string) => {
      const scrubbedName = getScrubbedTrackerName(name);
      if (
        excludedName &&
        getScrubbedTrackerName(excludedName) === scrubbedName
      ) {
        return undefined;
      }
      return trackerNameMap[scrubbedName];
    },
    [trackerNameMap],
  );

  return {
    trackerNameMap,
    getTracker,
  };
};
