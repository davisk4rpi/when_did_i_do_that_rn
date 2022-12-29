import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';

import { ThemeSpacing, Translation } from '../../app-context';
import { useAppErrorSnackBar } from '../../components';
import { Tracker, useNewTrackerLog, useRealmQuery } from '../../data-access';
import { ONE_MINUTE_MS } from '../../libs/luxon';
import { useCurrentTimeInterval, useViewLayout } from '../../libs/utililities';
import { useHomeScreenNavigation } from './home-screen-navigation.hook';

const DEFAULT_TIMER_INTERVAL_MS = 11000;
const FAST_TIMER_INTERVAL_MS = 1500;

export const useHomeScreen = () => {
  const trackers = useRealmQuery<Tracker>('Tracker');
  const { navigateToTrackerScreen, navigateToNewTrackerScreen } =
    useHomeScreenNavigation();

  const timerUpdateIntervalMs = useMemo(
    () => getTimerUpdateIntervalMs(trackers),
    [trackers],
  );

  const now = useCurrentTimeInterval(timerUpdateIntervalMs);

  const [fabLayout, handleFABLayout] = useViewLayout();
  const fabSpace = (fabLayout?.height ?? 0) + (fabLayout?.y ?? 0);

  const styles = useMemo(() => createStyleSheet(fabSpace), [fabSpace]);

  const { snackBar, addSnackBarToQueue, addErrorToSnackBarQueue } =
    useAppErrorSnackBar(styles.snackBar, Translation.errors.unknownErrorYikes);

  const newTrackerFAB = (
    <FAB
      onLayout={handleFABLayout}
      icon="plus"
      style={staticStyles.fab}
      onPress={navigateToNewTrackerScreen}
    />
  );

  const { createTrackerLog } = useNewTrackerLog({
    onError: addSnackBarToQueue,
  });

  return {
    now,
    trackers,
    styles,
    snackBar,
    handleError: addErrorToSnackBarQueue,
    createTrackerLog,
    navigateToTrackerScreen,
    newTrackerFAB,
  };
};

const staticStyles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: ThemeSpacing.base * 4,
    right: 0,
    bottom: 0,
  },
});

const createStyleSheet = (fabSpace: number) =>
  StyleSheet.create({
    flatListContentContainer: { paddingBottom: fabSpace },
    snackBar: {
      position: 'absolute',
      bottom: fabSpace,
      left: 0,
      right: 0,
    },
  });

const getTimerUpdateIntervalMs = (trackers: Realm.Results<Tracker>) => {
  const latestTime = Math.max(
    ...trackers.map(({ logs }) => Number(logs[0] ?? 0)),
  );
  return Date.now() - latestTime > ONE_MINUTE_MS
    ? DEFAULT_TIMER_INTERVAL_MS
    : FAST_TIMER_INTERVAL_MS;
};
