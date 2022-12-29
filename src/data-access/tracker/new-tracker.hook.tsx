import { useCallback } from 'react';

import { Translation } from '../../app-context';
import { InputError } from '../../libs/utililities';
import { Tracker, useRealm } from '../models';
import { useTrackerNameMap } from './tracker-name-map.hook';

interface UseNewTrackerParams {
  onError: (error: Error) => void;
}

export const useNewTracker = ({ onError }: UseNewTrackerParams) => {
  const realm = useRealm();

  const { getTracker } = useTrackerNameMap();

  const createTracker = useCallback(
    (name: string) => {
      const conflictingTracker = getTracker(name);
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
      realm.write(() => realm.create('Tracker', Tracker.generate(name)));
    },
    [realm, getTracker, onError],
  );

  return {
    createTracker,
  };
};
