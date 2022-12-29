import React, { useCallback, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import { AppStyles, ThemeSpacing, Translation } from '../../../app-context';
import { Tracker } from '../../../data-access';
import { MaterialBottomSheetTextInput } from '../../../libs/material-bottom-sheet';

interface EditTrackerLogFormProps {
  tracker: Pick<Tracker, 'name'>;
  updateTrackerName: (name: string) => void;
}

export const EditTrackerForm = ({
  tracker,
  updateTrackerName,
}: EditTrackerLogFormProps) => {
  const [newName, setNewName] = useState(tracker.name);
  const ogName = useRef(tracker.name);

  const handleUpdatePress = useCallback(() => {
    updateTrackerName(newName);
  }, [updateTrackerName, newName]);

  const updateDisabled = ogName.current === newName || newName === '';

  return (
    <View style={styles.editContainer}>
      <View style={styles.row}>
        <Text style={styles.editFormTitle} variant="titleMedium">
          {Translation.addANewTracker}
        </Text>
      </View>
      <View style={styles.row}>
        <MaterialBottomSheetTextInput
          label={Translation.name}
          autoFocus
          onChangeText={setNewName}
          autoCapitalize="none"
          blurOnSubmit={true}
          value={newName}
          style={AppStyles.flexGrow}
        />
      </View>
      <Button
        mode="contained"
        onPress={handleUpdatePress}
        disabled={updateDisabled}>
        {Translation.update}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  editContainer: {
    padding: ThemeSpacing.base * 2,
    alignItems: 'center',
    flex: 1,
  },
  row: {
    flexGrow: 1,
    maxWidth: 320,
    flexDirection: 'row',
  },
  editFormTitle: {
    flexGrow: 1,
    marginBottom: ThemeSpacing.base,
  },
});
