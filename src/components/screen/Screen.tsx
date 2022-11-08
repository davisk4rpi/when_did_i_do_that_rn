import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

import { ThemeSpacing } from '../../app-context';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    marginVertical: ThemeSpacing.verticalScreen,
    marginHorizontal: ThemeSpacing.horizontalScreen,
  },
});

export const Screen = (props: ViewProps) => {
  return <View {...props} style={styles.screen} />;
};
