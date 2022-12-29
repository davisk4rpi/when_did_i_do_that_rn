import { useCallback } from 'react';

import { UnknownError } from '../../libs/utililities';
import { Tracker, useRealm } from '../models';

interface UseDeleteTrackerParams {
  onError: (error: Error) => void;
  onSuccess?: () => void;
  tracker: Tracker | null;
}

export const useDeleteTracker = ({
  onError,
  onSuccess,
  tracker,
}: UseDeleteTrackerParams) => {
  const realm = useRealm();
  const deleteTracker = useCallback(() => {
    if (tracker === null) return;
    try {
      realm.write(() => {
        realm.delete(tracker);
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
  }, [realm, onError, onSuccess, tracker]);

  return {
    deleteTracker,
  };
};
