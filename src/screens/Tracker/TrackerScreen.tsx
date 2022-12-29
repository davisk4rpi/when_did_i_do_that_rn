import React, { useCallback } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { ThemeSpacing, Translation } from '../../app-context';
import { NotFoundScreen, Screen } from '../../components';
import { TrackerLog } from '../../data-access';
import {
  AutoSizeMaterialBottomSheetModal,
  MaterialBottomSheetModalProvider,
} from '../../libs/material-bottom-sheet';
import { RootStackParamList } from '../../navigation';
import { useTrackerScreen } from './tracker-screen.hook';
import { TrackerLogRow } from './TrackerLogRow';
import { TrackerScreenFlatListHeader } from './TrackerScreenFlatListHeader';

type TrackerScreenProps = NativeStackScreenProps<RootStackParamList, 'Tracker'>;

export const TrackerScreen = ({ route }: TrackerScreenProps) => {
  const { id } = route.params;
  const {
    tracker,
    deleteDialog,
    openTrackerLogTimePickerModal,
    deleteTrackerLog,
    bottomSheetContent,
    openTrackerMenu,
    editTrackerLogDatePickerModal,
  } = useTrackerScreen(id);

  const renderTrackerLog = useCallback(
    ({ item }: { item: TrackerLog }) => {
      const handleEditPress = () => openTrackerLogTimePickerModal(item);
      const handleDeletePress = () => deleteTrackerLog(item);
      return (
        <TrackerLogRow
          onEditPress={handleEditPress}
          onDeletePress={handleDeletePress}
          trackerLog={item}
        />
      );
    },
    [openTrackerLogTimePickerModal, deleteTrackerLog],
  );
  const ListHeaderComponent = useCallback(
    () => <TrackerScreenFlatListHeader openTrackerMenu={openTrackerMenu} />,
    [openTrackerMenu],
  );

  if (!tracker) {
    return <NotFoundScreen thing={Translation.tracker} />;
  }

  return (
    <Screen testID="TrackerScreen">
      <MaterialBottomSheetModalProvider>
        <View style={styles.container}>
          <FlatList
            style={styles.flatList}
            data={tracker.logs}
            renderItem={renderTrackerLog}
            ListEmptyComponent={NoDataText}
            ListHeaderComponent={ListHeaderComponent}
            keyExtractor={trackerLogKeyExtractor}
            stickyHeaderIndices={STICKY_HEADER_INDICES}
          />
        </View>
        <AutoSizeMaterialBottomSheetModal keyboardBehavior="fillParent">
          {bottomSheetContent}
        </AutoSizeMaterialBottomSheetModal>
      </MaterialBottomSheetModalProvider>
      {deleteDialog}
      {editTrackerLogDatePickerModal}
    </Screen>
  );
};
const STICKY_HEADER_INDICES = [0];

const trackerLogKeyExtractor = ({ timestamp }: TrackerLog) =>
  timestamp.toString();

const NoDataText = () => (
  <Text style={{ marginVertical: ThemeSpacing.base }}>
    {Translation.youHaventLoggedAnythingYet}
  </Text>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatList: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
