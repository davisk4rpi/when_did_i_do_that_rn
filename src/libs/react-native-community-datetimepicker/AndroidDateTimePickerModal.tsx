import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Platform } from 'react-native';

import {
  AndroidNativeProps,
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';

interface AndroidDateTimePickerModalProps
  extends Pick<
    AndroidNativeProps,
    'value' | 'maximumDate' | 'minimumDate' | 'onError' | 'minuteInterval'
  > {
  visible: boolean;
  onConfirm: (newDate?: Date) => void;
  onDismiss: () => void;
  dismissLabel?: string;
  confirmLabel?: string;
}

export const AndroidDateTimePickerModal = ({
  visible,
  onConfirm,
  onDismiss,
  value,
  maximumDate,
  minimumDate,
  dismissLabel,
  confirmLabel,
  minuteInterval,
  onError,
}: AndroidDateTimePickerModalProps) => {
  const [confirmedDate, setConfirmedDate] = useState<Date | undefined>();

  useEffect(() => {
    setConfirmedDate(undefined);
  }, [value]);

  const handleDateChange = useCallback(
    (event: DateTimePickerEvent, date?: Date) => {
      if (event.type === 'set') {
        setConfirmedDate(date);
      } else if (event.type === 'dismissed') {
        setConfirmedDate(undefined);
        onDismiss();
      }
    },
    [onDismiss],
  );

  const handleTimeChange = useCallback(
    (event: DateTimePickerEvent, date?: Date) => {
      if (event.type === 'set') {
        onConfirm(date);
      } else if (event.type === 'dismissed') {
        setConfirmedDate(undefined);
        onDismiss();
      }
    },
    [onConfirm, onDismiss],
  );

  const positiveButton = useMemo(
    () => (confirmLabel ? { label: confirmLabel } : undefined),
    [confirmLabel],
  );
  const negativeButton = useMemo(
    () => (dismissLabel ? { label: dismissLabel } : undefined),
    [dismissLabel],
  );
  const androidPropsRef = useRef({
    value,
    maximumDate,
    minimumDate,
    positiveButton,
    negativeButton,
    onError,
    minuteInterval,
    handleDateChange,
    handleTimeChange,
  });
  androidPropsRef.current = {
    value,
    maximumDate,
    minimumDate,
    positiveButton,
    negativeButton,
    onError,
    minuteInterval,
    handleDateChange,
    handleTimeChange,
  };

  useEffect(() => {
    if (Platform.OS !== 'android') {
      return;
    }
    if (visible) {
      const { handleDateChange, handleTimeChange, ...androidProps } =
        androidPropsRef.current;
      if (confirmedDate === undefined) {
        DateTimePickerAndroid.open({
          mode: 'date',
          onChange: handleDateChange,
          ...androidProps,
        });
      } else {
        DateTimePickerAndroid.open({
          mode: 'time',
          onChange: handleTimeChange,
          ...androidProps,
          value: confirmedDate,
        });
      }
    } else {
      DateTimePickerAndroid.dismiss(
        confirmedDate === undefined ? 'date' : 'time',
      );
    }
  }, [visible, confirmedDate]);
  return null;
};
