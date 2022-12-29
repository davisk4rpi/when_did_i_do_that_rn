import { useCallback } from 'react';

import { Translation } from '../../app-context';
import { InputError } from '../../libs/utililities';
import { Tracker, useRealm } from '../models';
import { useTrackerNameMap } from './tracker-name-map.hook';

interface UseUpdateTrackerParams {
  onError: (error: Error) => void;
  onUpdateSuccess?: () => void;
  tracker: Tracker | null;
}

export const useUpdateTracker = ({
  onError,
  onUpdateSuccess,
  tracker,
}: UseUpdateTrackerParams) => {
  const realm = useRealm();
  const { getTracker } = useTrackerNameMap();

  const updateTrackerName = useCallback(
    (newName: string) => {
      if (tracker === null) return;
      const conflictingTracker = getTracker(newName, tracker.name);
      if (conflictingTracker) {
        onError(
          new InputError(
            Translation.errors.youAlreadyHaveATrackerNamed(
              conflictingTracker.name,
            ),
          ),
        );
        return;
      }
      realm.write(() => {
        tracker.updateName(newName);
      });
      onUpdateSuccess && onUpdateSuccess();
    },
    [realm, onError, onUpdateSuccess, getTracker, tracker],
  );

  return {
    updateTrackerName,
  };
};
