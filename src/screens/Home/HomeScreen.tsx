import React, { useCallback } from 'react';
import { FlatList } from 'react-native';

import { Screen } from '../../components';
import { Tracker } from '../../data-access';
import { MaterialBottomSheetModalProvider } from '../../libs/material-bottom-sheet';
import { useHomeScreen } from './home-screen.hook';
import { HomeScreenTrackerCard } from './HomeScreenTrackerCard';

export const HomeScreen = () => {
  const {
    trackers,
    styles,
    snackBar,
    newTrackerFAB,
    createTrackerLog,
    navigateToTrackerScreen,
    now,
  } = useHomeScreen();

  const TrackerCard = useCallback(
    ({ item }: { item: Tracker }) => {
      return (
        <HomeScreenTrackerCard
          tracker={item}
          createTrackerLog={createTrackerLog}
          navigateToTrackerScreen={navigateToTrackerScreen}
          now={now}
        />
      );
    },
    [createTrackerLog, now, navigateToTrackerScreen],
  );

  return (
    <Screen testID="HomeScreen">
      <MaterialBottomSheetModalProvider>
        <FlatList
          contentContainerStyle={styles.flatListContentContainer}
          data={trackers}
          renderItem={TrackerCard}
          keyExtractor={({ id }) => id.toHexString()}
          scrollEnabled={trackers.length > 3}
        />
        {snackBar}
        {newTrackerFAB}
      </MaterialBottomSheetModalProvider>
    </Screen>
  );
};
