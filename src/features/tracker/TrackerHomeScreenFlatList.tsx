import React, { useCallback } from 'react';
import { FlatList, FlatListProps, StyleSheet } from 'react-native';
import { Card, IconButton } from 'react-native-paper';

import { useNavigation } from '@react-navigation/native';

import { ThemeSpacing, Translation } from '../../app-context';
import {
  Tracker,
  useNewTrackerInstance,
  useRealmQuery,
} from '../../data-access';
import {
  getElapsedTimeStringSinceDate,
  ONE_MINUTE_MS,
  useCurrentTimeInterval,
} from '../../utililities';

const DEFAULT_TIMER_INTERVAL_MS = 11000;
const FAST_TIMER_INTERVAL_MS = 1500;

interface TrackerHomeScreenFlatListProps
  extends Pick<FlatListProps<Tracker>, 'contentContainerStyle'> {
  onError: (e: Error) => void;
}

export const TrackerHomeScreenFlatList = ({
  onError,
  contentContainerStyle,
}: TrackerHomeScreenFlatListProps) => {
  const trackers = useRealmQuery<Tracker>('Tracker');
  const { navigate } = useNavigation();
  const { createTrackerInstance } = useNewTrackerInstance({ onError });

  const latestTime = Math.max(
    ...trackers.map(({ mostRecentTrackerInstance }) =>
      Number(mostRecentTrackerInstance?.dateTime ?? 0),
    ),
  );
  const timerUpdateIntervalMs =
    Date.now() - latestTime > ONE_MINUTE_MS
      ? DEFAULT_TIMER_INTERVAL_MS
      : FAST_TIMER_INTERVAL_MS;

  const now = useCurrentTimeInterval(timerUpdateIntervalMs);

  const TrackerCard = useCallback(
    ({ item }: { item: Tracker }) => {
      const { mostRecentTrackerInstance, name, _id } = item;
      const handleCardPress = () =>
        navigate('Tracker', {
          id: _id.toHexString(),
          name,
        });
      const handleButtonPress = () => createTrackerInstance(item);
      const subtitle = !mostRecentTrackerInstance
        ? Translation.tapIconToRecordActivity
        : `${getElapsedTimeStringSinceDate(
            mostRecentTrackerInstance.dateTime,
            now,
          )} ${Translation.ago}`;
      return (
        <Card style={styles.trackerCard} onPress={handleCardPress}>
          <Card.Title
            title={name}
            subtitle={subtitle}
            subtitleStyle={styles.timerStyle}
            right={props => (
              <IconButton
                {...props}
                icon="send"
                onPress={handleButtonPress}
                mode="contained"
                selected
              />
            )}
          />
        </Card>
      );
    },
    [createTrackerInstance, now, navigate],
  );
  return (
    <FlatList
      contentContainerStyle={contentContainerStyle}
      data={trackers}
      renderItem={TrackerCard}
      keyExtractor={({ name }) => name}
    />
  );
};
const styles = StyleSheet.create({
  trackerCard: {
    marginVertical: ThemeSpacing.base,
    marginHorizontal: ThemeSpacing.base,
    paddingHorizontal: ThemeSpacing.base,
  },
  timerStyle: {
    fontStyle: 'italic',
  },
});
