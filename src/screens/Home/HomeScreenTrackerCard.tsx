import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, IconButton } from 'react-native-paper';

import { ThemeSpacing, Translation } from '../../app-context';
import { Tracker } from '../../data-access';
import { getElapsedTimeStringSinceDate } from '../../libs/luxon';

interface HomeScreenTrackerCardProps {
  tracker: Tracker;
  createTrackerLog: (tracker: Tracker) => void;
  navigateToTrackerScreen: (tracker: Tracker) => void;
  now: Date;
}

export const HomeScreenTrackerCard = ({
  tracker,
  createTrackerLog,
  navigateToTrackerScreen,
  now,
}: HomeScreenTrackerCardProps) => {
  const handleCardPress = () => navigateToTrackerScreen(tracker);
  const handleButtonPress = () => createTrackerLog(tracker);
  const { logs } = tracker;
  const subtitle =
    logs.length === 0
      ? Translation.tapIconToRecordActivity
      : `${getElapsedTimeStringSinceDate(logs[0].dateTime, now)} ${
          Translation.ago
        }`;
  return (
    <Card style={styles.trackerCard} onPress={handleCardPress} mode="contained">
      <Card.Title
        title={tracker.name}
        subtitle={subtitle}
        subtitleStyle={styles.timerStyle}
        right={props => (
          <IconButton
            {...props}
            icon="timer-outline"
            onPress={handleButtonPress}
            mode="contained"
            selected
          />
        )}
      />
    </Card>
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
