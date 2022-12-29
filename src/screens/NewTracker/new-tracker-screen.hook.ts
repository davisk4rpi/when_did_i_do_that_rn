import { useCallback } from 'react';

import { useNavigation } from '@react-navigation/native';

import { Translation } from '../../app-context';
import { useNewTrackerForm } from './new-tracker-form.hook';

export const useNewTrackerScreen = () => {
  const { goBack, navigate } = useNavigation();

  const {
    name,
    handleChangeTextName,
    handleSubmit,
    existingTracker,
    submitDisabled,
  } = useNewTrackerForm({ onSuccess: goBack });

  const navigateToTrackerScreen = useCallback(() => {
    if (!existingTracker) return;
    navigate('Tracker', {
      id: existingTracker.id.toHexString(),
      name: existingTracker.name,
    });
  }, [navigate, existingTracker]);

  return {
    handleSubmit,
    existingTrackerInfo: existingTracker
      ? {
          name: existingTracker.name,
          navigateToTrackerScreen,
          buttonText: Translation.viewThing('"' + existingTracker.name + '"'),
          helperText: Translation.xAlreadyExists(existingTracker.name),
        }
      : null,
    submitDisabled,
    name,
    handleChangeTextName,
  };
};
