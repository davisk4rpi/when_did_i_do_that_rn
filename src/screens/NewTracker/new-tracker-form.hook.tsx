import { useCallback, useState } from 'react';

import { Tracker, useRealm, useTrackerNameMap } from '../../data-access';

interface UseNewTrackerFormParams {
  onSuccess: () => void;
}

export const useNewTrackerForm = ({ onSuccess }: UseNewTrackerFormParams) => {
  const realm = useRealm();

  const [name, setName] = useState('');

  const { getTracker } = useTrackerNameMap();

  const existingTracker = name === undefined ? undefined : getTracker(name);

  const handleChangeTextName = useCallback((newName: string) => {
    setName(newName);
  }, []);

  const submitDisabled = !!existingTracker || name.trim() === '';

  const handleSubmit = useCallback(() => {
    if (submitDisabled) return;

    realm.write(() => realm.create('Tracker', Tracker.generate(name.trim())));
    onSuccess();
  }, [realm, submitDisabled, onSuccess, name]);

  return {
    name,
    handleChangeTextName,
    handleSubmit,
    existingTracker,
    submitDisabled,
  };
};
