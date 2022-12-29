import { useCallback } from 'react';

import { UnknownError } from '../../../libs/utililities';
import { TrackerLog, useRealm } from '../../models';

interface UseDeleteTrackerLogParams {
  onError: (error: Error) => void;
  onSuccess?: () => void;
  trackerLog?: TrackerLog | undefined;
}

export const useDeleteTrackerLog = ({
  onError,
  onSuccess,
}: UseDeleteTrackerLogParams) => {
  const realm = useRealm();
  const deleteTrackerLog = useCallback(
    (trackerLog: TrackerLog) => {
      if (trackerLog === undefined) return;
      try {
        realm.write(() => {
          realm.delete(trackerLog);
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
    [realm, onError, onSuccess],
  );

  return {
    deleteTrackerLog,
  };
};
