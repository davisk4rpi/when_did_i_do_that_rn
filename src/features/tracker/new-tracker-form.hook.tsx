import { useCallback, useMemo, useRef, useState } from 'react';

import { Tracker, useRealm, useRealmQuery } from '../../data-access';

interface UseNewTrackerFormParams {
  onSuccess: () => void;
}
type TrackerMap = Record<string, Tracker>;

export const useNewTrackerForm = ({ onSuccess }: UseNewTrackerFormParams) => {
  const realm = useRealm();

  const trackers = useRealmQuery<Tracker>('Tracker');

  const [name, setName] = useState<undefined | string>(undefined);
  const nameRef = useRef(name);
  nameRef.current = name;

  const trackerMap = useMemo(() => {
    const trackerMap: TrackerMap = {};
    trackers.forEach(tracker => {
      trackerMap[tracker.name.toLowerCase()] = tracker;
    });
    return trackerMap;
  }, [trackers]);

  const existingTracker =
    name === undefined ? undefined : trackerMap[name.toLowerCase()];
  const hasExistingTracker = !!existingTracker;

  const handleChangeTextName = useCallback((newName: string) => {
    setName(newName === '' ? undefined : newName);
  }, []);

  const handleSubmit = useCallback(() => {
    const name = nameRef.current;
    if (name === undefined || hasExistingTracker) return;

    realm.write(() => realm.create('Tracker', Tracker.generate(name)));
    onSuccess();
  }, [realm, hasExistingTracker, onSuccess]);

  return {
    name,
    handleChangeTextName,
    handleSubmit,
    existingTracker,
    submitDisabled: !!existingTracker || name === null,
  };
};
