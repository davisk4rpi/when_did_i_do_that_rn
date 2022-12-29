import { useCallback } from 'react';

import { useNavigation } from '@react-navigation/native';

import { Tracker } from '../../data-access';

export const useHomeScreenNavigation = () => {
  const { navigate } = useNavigation();
  const navigateToTrackerScreen = useCallback(
    ({ id, name }: Pick<Tracker, 'id' | 'name'>) => {
      navigate('Tracker', {
        id: id.toHexString(),
        name,
      });
    },
    [navigate],
  );

  const navigateToNewTrackerScreen = useCallback(() => {
    navigate('NewTracker');
  }, [navigate]);

  return {
    navigateToTrackerScreen,
    navigateToNewTrackerScreen,
  };
};
