import React, { useCallback } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Divider, IconButton, Text } from 'react-native-paper';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { ThemeSpacing, Translation } from '../../app-context';
import { NotFoundScreen, Screen } from '../../components';
import {
  Tracker,
  TrackerInstance,
  useRealmObject,
} from '../../data-access/models';
import { dateToLocalDateTimeDisplay } from '../../utililities';
import { RootStackParamList } from '../types';

type TrackerScreenProps = NativeStackScreenProps<RootStackParamList, 'Tracker'>;

export const TrackerScreen = ({ route }: TrackerScreenProps) => {
  const { id } = route.params;
  const tracker = useRealmObject<Tracker>(
    'Tracker',
    Realm.BSON.ObjectId.createFromHexString(id),
  );

  const renderTrackerInstance = useCallback(
    ({ item }: { item: TrackerInstance }) => {
      const { dateTime } = item;
      return (
        <View style={styles.row}>
          <View style={styles.flexNoGrowColumn}>
            <IconButton icon="pencil" />
          </View>
          <Text style={styles.flexGrowColumn}>
            {dateToLocalDateTimeDisplay(dateTime)}
          </Text>
        </View>
      );
    },
    [],
  );

  if (!tracker) {
    return <NotFoundScreen thing={Translation.tracker} />;
  }

  const trackerInstances = tracker.trackerInstances.sorted('dateTime', true);

  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.title} variant="titleMedium">
          {Translation.activityLog}
        </Text>
        <ActivityLogColumnHeader />
        <FlatList
          data={trackerInstances ?? []}
          renderItem={renderTrackerInstance}
          ListEmptyComponent={NoDataText}
          keyExtractor={trackerInstanceKeyExtractor}
        />
      </View>
    </Screen>
  );
};

const trackerInstanceKeyExtractor = ({ _id }: TrackerInstance) =>
  _id.toHexString();

const NoDataText = () => (
  <Text style={{ marginVertical: ThemeSpacing.base }}>
    {Translation.youHaventLoggedAnythingYet}
  </Text>
);

const ActivityLogColumnHeader = () => (
  <>
    <View style={styles.row}>
      <View style={[styles.flexNoGrowColumn, styles.invisible]}>
        <IconButton icon="pencil" />
      </View>
      <Text style={styles.flexGrowColumn}>{Translation.date}</Text>
    </View>
    <Divider style={styles.divider} bold />
  </>
);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flex: 1,
  },
  title: {
    marginVertical: 12,
  },
  editActivityCell: {
    flexShrink: 0,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    marginBottom: ThemeSpacing.base,
  },
  flexGrowColumn: {
    flexGrow: 1,
  },
  flexNoGrowColumn: {
    flexGrow: 0,
  },
  invisible: {
    opacity: 0,
  },
});
