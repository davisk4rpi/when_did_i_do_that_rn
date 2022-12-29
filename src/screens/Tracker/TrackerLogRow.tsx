import React from 'react';
import { View } from 'react-native';
import { IconButton, Text } from 'react-native-paper';

import { AppStyles } from '../../app-context';
import { TrackerLog } from '../../data-access';
import { dateToLocalDateTimeDisplay } from '../../libs/luxon';

interface TrackerLogRowProps {
  trackerLog: Pick<TrackerLog, 'dateTime'>;
  onEditPress: () => void;
  onDeletePress: () => void;
}

export const TrackerLogRow = ({
  trackerLog,
  onEditPress,
  onDeletePress,
}: TrackerLogRowProps) => {
  return (
    <View style={AppStyles.rowAlignItemsCenter}>
      <Text style={AppStyles.flexGrow}>
        {dateToLocalDateTimeDisplay(trackerLog.dateTime)}
      </Text>
      <View style={[AppStyles.flexNoGrow, AppStyles.row]}>
        <IconButton icon="pencil" onPress={onEditPress} />
        <IconButton icon="delete" onPress={onDeletePress} />
      </View>
    </View>
  );
};
