import { useCallback } from 'react';

import { Translation } from '../../app-context';
import { Tracker, TrackerInstance, useRealm } from '../../data-access/models';

interface UseNewTrackerInstanceParams {
  onError: (error: Error) => void;
}

export const useNewTrackerInstance = ({
  onError,
}: UseNewTrackerInstanceParams) => {
  const realm = useRealm();

  const createTrackerInstance = useCallback(
    (tracker: Tracker, dateTime = new Date()) => {
      if (dateTime.getTime() > Date.now()) {
        onError(new Error(Translation.errors.dateCannotBeInTheFuture));
        return;
      }
      realm.write(() => {
        const instance = realm.create<TrackerInstance>(
          'TrackerInstance',
          TrackerInstance.generate(dateTime),
        );
        tracker.trackerInstances.push(instance);
        const { mostRecentTrackerInstance } = tracker;
        if (
          !mostRecentTrackerInstance ||
          mostRecentTrackerInstance.dateTime < instance.dateTime
        ) {
          tracker.mostRecentTrackerInstance = instance;
        }
      });
    },
    [realm, onError],
  );

  return {
    createTrackerInstance,
  };
};
