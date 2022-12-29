import { useCallback } from 'react';

import { UnknownError } from '../../../libs/utililities';
import { Tracker, TrackerLog, useRealm } from '../../models';

interface UseUpdateTrackerLogParams {
  onError: (error: Error) => void;
  onSuccess?: () => void;
  tracker: Tracker | null;
}

export const useUpdateTrackerLog = ({
  onError,
  onSuccess,
  tracker,
}: UseUpdateTrackerLogParams) => {
  const realm = useRealm();
  const updateTrackerLogDateTime = useCallback(
    (trackerLog: TrackerLog, newDateTime: Date) => {
      if (tracker === null) return;
      try {
        realm.write(() => {
          tracker.updateLog(trackerLog.dateTime, newDateTime);
        });
      } catch (e) {
        if (e instanceof Error) {
          onError(e);
        } else {
          onError(new UnknownError());
        }
        return;
      }

      onSuccess && onSuccess();
    },
    [realm, onError, onSuccess, tracker],
  );

  return {
    updateTrackerLogDateTime,
  };
};
