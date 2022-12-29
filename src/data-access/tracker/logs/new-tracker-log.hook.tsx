import { useCallback } from 'react';

import { UnknownError } from '../../../libs/utililities';
import { Tracker, TrackerLog, useRealm } from '../../models';

interface UseNewTrackerLogParams {
  onError: (error: Error) => void;
}

export const useNewTrackerLog = ({ onError }: UseNewTrackerLogParams) => {
  const realm = useRealm();

  const createTrackerLog = useCallback(
    (tracker: Tracker, dateTime?: Date) => {
      try {
        realm.write(() => {
          const log = realm.create(TrackerLog, TrackerLog.generate(dateTime));
          tracker.addLog(log);
        });
      } catch (e) {
        if (e instanceof Error) {
          onError(e);
        } else {
          onError(new UnknownError());
        }
      }
    },
    [realm, onError],
  );

  return {
    createTrackerLog,
  };
};
