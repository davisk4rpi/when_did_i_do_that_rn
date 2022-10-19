import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 12,
  },
});

export const Screen = (props: ViewProps) => {
  return <View {...props} style={styles.screen} />;
};
