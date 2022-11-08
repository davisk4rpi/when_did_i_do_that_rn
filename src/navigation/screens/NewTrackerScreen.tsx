import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';

import { useNavigation } from '@react-navigation/native';

import { Translation } from '../../app-context';
import { KeyboardAvoidingScreen, PersistedSnackBar } from '../../components';
import { useNewTrackerForm } from '../../features';

export const NewTrackerScreen = () => {
  const { goBack, navigate } = useNavigation();

  const {
    name,
    handleChangeTextName,
    handleSubmit,
    existingTracker,
    submitDisabled,
  } = useNewTrackerForm({ onSuccess: goBack });

  const snackBarAction = useMemo(() => {
    if (!existingTracker) return undefined;
    return {
      label: Translation.view,
      onPress: () => {
        // Navigate to Tracker Screen
        navigate('Tracker', {
          id: existingTracker._id.toHexString(),
          name: existingTracker.name,
        });
      },
    };
  }, [existingTracker, navigate]);

  return (
    <KeyboardAvoidingScreen>
      <View style={styles.container}>
        <Text style={styles.title} variant="titleMedium">
          {Translation.addANewTracker}
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            label={Translation.name}
            value={name}
            onChangeText={handleChangeTextName}
            placeholder={Translation.trackerNamePlaceholder}
            blurOnSubmit={true}
            autoCapitalize="none"
            autoFocus
          />
          {!!existingTracker && (
            <PersistedSnackBar
              visible={!!existingTracker}
              style={styles.snackBar}
              action={snackBarAction}>
              {Translation.xAlreadyExists(existingTracker?.name)}
            </PersistedSnackBar>
          )}
        </View>
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={handleSubmit}
            disabled={submitDisabled}>
            {Translation.add}
          </Button>
        </View>
      </View>
    </KeyboardAvoidingScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flex: 1,
    paddingBottom: 12,
  },
  title: {
    marginVertical: 12,
  },
  buttonContainer: {
    marginTop: 12,
  },
  inputContainer: {
    flexGrow: 1,
  },
  snackBar: {
    marginBottom: 12,
    marginHorizontal: 12,
  },
});
