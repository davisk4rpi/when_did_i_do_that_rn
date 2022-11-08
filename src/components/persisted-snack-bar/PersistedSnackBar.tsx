import React from 'react';
import { Snackbar, SnackbarProps } from 'react-native-paper';

const onDismiss = () => {};

export const PersistedSnackBar = (
  props: Omit<SnackbarProps, 'duration' | 'onDismiss' | 'theme'>,
) => {
  return <Snackbar {...props} onDismiss={onDismiss} duration={Infinity} />;
};
