import React, { useCallback } from 'react';
import { StyleSheet, ViewProps } from 'react-native';
import { FAB } from 'react-native-paper';

import { useNavigation } from '@react-navigation/native';

export const NewTrackerFAB = ({ onLayout }: Pick<ViewProps, 'onLayout'>) => {
  const { navigate } = useNavigation();
  const handlePress = useCallback(() => {
    navigate('NewTracker');
  }, [navigate]);
  return (
    <FAB
      onLayout={onLayout}
      icon="plus"
      style={styles.fab}
      onPress={handlePress}
    />
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
