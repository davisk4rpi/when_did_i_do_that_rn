import React from 'react';
import { Platform } from 'react-native';

import {
  AndroidNativeProps,
  IOSNativeProps,
} from '@react-native-community/datetimepicker';

import { AndroidDateTimePickerModal } from './AndroidDateTimePickerModal';
import { IOSDateTimePickerModal } from './IOSDateTimePickerModal';

interface DateTimePickerModalProps
  extends Pick<
      AndroidNativeProps,
      'value' | 'maximumDate' | 'minimumDate' | 'onError' | 'minuteInterval'
    >,
    Pick<IOSNativeProps, 'locale'> {
  visible: boolean;
  onConfirm: (newDate?: Date) => void;
  onDismiss: () => void;
  dismissLabel?: string;
  confirmLabel?: string;
}

export const DateTimePickerModal = ({
  visible,
  onConfirm,
  onDismiss,
  dismissLabel,
  confirmLabel,
  value,
  maximumDate,
  minimumDate,
  locale = 'en',
  minuteInterval,
  onError,
}: DateTimePickerModalProps) => {
  if (Platform.OS === 'ios') {
    return (
      <IOSDateTimePickerModal
        visible={visible}
        onConfirm={onConfirm}
        onDismiss={onDismiss}
        value={value}
        maximumDate={maximumDate}
        minimumDate={minimumDate}
        locale={locale}
        dismissLabel={dismissLabel}
        confirmLabel={confirmLabel}
      />
    );
  } else if (Platform.OS === 'android') {
    return (
      <AndroidDateTimePickerModal
        visible={visible}
        onConfirm={onConfirm}
        onDismiss={onDismiss}
        value={value}
        maximumDate={maximumDate}
        minimumDate={minimumDate}
        onError={onError}
        minuteInterval={minuteInterval}
        dismissLabel={dismissLabel}
        confirmLabel={confirmLabel}
      />
    );
  }
  return null;
};
