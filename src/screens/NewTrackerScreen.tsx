import React, { useCallback, useMemo, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Snackbar, Text, TextInput } from 'react-native-paper';

import { useNavigation } from '@react-navigation/native';

import { KeyboardAvoidingScreen } from '../components';
import { Tracker, useRealm, useRealmQuery } from '../models';

const trackerAlreadyExistsErrorMsg = 'This tracker already exists';

export const NewTrackerScreen = () => {
  const realm = useRealm();
  const { goBack } = useNavigation();

  const trackers = useRealmQuery<Tracker>('Tracker');

  const [error, setError] = useState<null | string>(null);
  const [name, setName] = useState<null | string>(null);
  const nameRef = useRef(name);
  nameRef.current = name;

  const trackersNameSet = useMemo(() => {
    const newSet: Set<string> = new Set();
    trackers.forEach(tracker => {
      if (newSet.has(tracker.name.toLowerCase())) {
        realm.write(() => realm.delete(tracker));
        return;
      }
      newSet.add(tracker.name.toLowerCase());
    });
    return newSet;
  }, [trackers, realm]);

  const handleChangeText = useCallback((newName: string) => {
    setError(null);
    if (newName) {
      setName(newName);
    } else {
      setName(null);
    }
  }, []);

  const handleSubmit = useCallback(() => {
    const name = nameRef.current;
    if (name === null) {
      return;
    }
    if (trackersNameSet.has(name.toLowerCase())) {
      setError(trackerAlreadyExistsErrorMsg);
      return;
    }
    realm.write(() => realm.create('Tracker', Tracker.generate(name)));
    goBack();
  }, [realm, trackersNameSet, goBack]);

  const handleBlur = useCallback(() => {
    const name = nameRef.current;
    if (name === null) {
      return;
    }
    if (trackersNameSet.has(name.toLowerCase())) {
      setError(trackerAlreadyExistsErrorMsg);
      return;
    }
  }, [trackersNameSet]);

  return (
    <KeyboardAvoidingScreen>
      <View style={styles.container}>
        <Text style={styles.title} variant="titleMedium">
          Add a new Tracker
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            label="Name"
            value={name || ''}
            onChangeText={handleChangeText}
            placeholder={'ex: Slept for 7+ hours'}
            blurOnSubmit={true}
            autoCapitalize="none"
            onBlur={handleBlur}
            autoFocus
          />
          <Snackbar
            visible={!!error}
            style={styles.snackBar}
            onDismiss={() => {
              console.log('attempted dismiss');
            }}
            action={{
              label: 'View',
              onPress: () => {
                // Do something
              },
            }}>
            {error}
          </Snackbar>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={handleSubmit}
            disabled={!!error || name === null}>
            Add
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
