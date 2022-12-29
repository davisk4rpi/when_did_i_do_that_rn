import React, { useMemo } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { Divider, IconButton, Text } from 'react-native-paper';

import { ThemeSpacing, Translation, useTheme } from '../../app-context';

interface TrackerScreenFlatListHeaderProps {
  openTrackerMenu: () => void;
}

export const TrackerScreenFlatListHeader = ({
  openTrackerMenu,
}: TrackerScreenFlatListHeaderProps) => {
  const { colors } = useTheme();
  const backgroundStyle: ViewStyle = useMemo(
    () => ({
      backgroundColor: colors.background,
    }),
    [colors],
  );
  return (
    <View style={backgroundStyle}>
      <View style={styles.row}>
        <Text style={styles.title} variant="titleMedium">
          {Translation.activityLog}
        </Text>
        <IconButton onPress={openTrackerMenu} icon="menu" />
      </View>
      <Divider style={styles.divider} bold />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    marginVertical: ThemeSpacing.base * 2,
  },
  divider: {
    marginBottom: ThemeSpacing.base,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
