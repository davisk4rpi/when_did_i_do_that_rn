import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ViewStyle } from 'react-native';
import { Snackbar, SnackbarProps } from 'react-native-paper';

import { Translation } from '../../app-context';

type SnackBarConfig = Pick<SnackbarProps, 'action' | 'duration'> & {
  message: string;
  dismissable?: boolean;
};

const snackBarConfigs: SnackBarConfig[] = [];

const _addSnackBarToQueue = ({
  dismissable = true,
  ...config
}: SnackBarConfig) => {
  snackBarConfigs.push({ dismissable, ...config });
};

export const useAppSnackBar = (wrapperStyle: ViewStyle) => {
  const [visible, setVisible] = useState(false);
  const handleDismiss = useCallback(() => {
    snackBarConfigs.shift();
    setVisible(false);
  }, []);

  useEffect(() => {
    if (!visible && snackBarConfigs.length > 0) {
      // Timeout allows snackbar to disappear and reappear as it progresses through the queue
      const timeout = setTimeout(() => {
        setVisible(true);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [visible]);

  const addSnackBarToQueue = useCallback((config: SnackBarConfig) => {
    _addSnackBarToQueue(config);
    setVisible(true);
  }, []);

  const action = useMemo(() => {
    if (visible) {
      if (snackBarConfigs[0]?.action) return snackBarConfigs[0]?.action;
      if (snackBarConfigs[0]?.dismissable) {
        return { label: Translation.dismiss, onPress: handleDismiss };
      }
      return undefined;
    }
  }, [handleDismiss, visible]);

  const snackBar = (
    <Snackbar
      wrapperStyle={wrapperStyle}
      onDismiss={handleDismiss}
      visible={visible}
      duration={snackBarConfigs[0]?.duration}
      action={action}>
      {snackBarConfigs[0]?.message}
    </Snackbar>
  );

  return {
    snackBar,
    addSnackBarToQueue,
  };
};
