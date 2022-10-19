import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';

import { useNavigation } from '@react-navigation/native';

export const NewTrackerFAB = () => {
  const { navigate } = useNavigation();
  const handlePress = useCallback(() => navigate('NewTracker'), [navigate]);
  return <FAB icon="plus" style={styles.fab} onPress={handlePress} />;
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
