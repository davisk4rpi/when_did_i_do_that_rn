import React, { useCallback, useEffect, useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { Button, Modal, Surface } from 'react-native-paper';

import DateTimePicker, {
  DateTimePickerEvent,
  IOSNativeProps,
} from '@react-native-community/datetimepicker';

import {
  AppStyles,
  ThemeSpacing,
  Translation,
  useTheme,
} from '../../app-context';

interface IOSDateTimePickerModalProps
  extends Pick<
    IOSNativeProps,
    'value' | 'maximumDate' | 'minimumDate' | 'locale' | 'minuteInterval'
  > {
  visible: boolean;
  onDismiss: () => void;
  onConfirm: (newDate?: Date) => void;
  dismissLabel?: string;
  confirmLabel?: string;
}

export const IOSDateTimePickerModal = ({
  visible,
  onDismiss,
  onConfirm,
  dismissLabel,
  confirmLabel,
  value,
  maximumDate,
  minimumDate,
  locale,
  minuteInterval,
}: IOSDateTimePickerModalProps) => {
  const { colors, isDarkTheme } = useTheme();
  const [internalValue, setInternalValue] = useState<Date>(value);
  const [dateConfirmed, setDateConfirmed] = useState(false);

  useEffect(() => {
    if (visible) {
      setDateConfirmed(false);
      setInternalValue(value);
    }
  }, [value, visible]);

  const handleDateChange = useCallback(
    (event: DateTimePickerEvent, date?: Date) => {
      if (event.type === 'set') {
        if (date === undefined) return onConfirm(undefined);
        setInternalValue(date);
      } else if (event.type === 'dismissed') {
        onDismiss();
      }
    },
    [onDismiss, onConfirm],
  );

  const handleTimeChange = useCallback(
    (event: DateTimePickerEvent, date?: Date) => {
      if (event.type === 'set') {
        if (date === undefined) return onConfirm(undefined);
        setInternalValue(date);
      } else if (event.type === 'dismissed') {
        onDismiss();
      }
    },
    [onConfirm, onDismiss],
  );

  const handleConfirmPress = useCallback(() => {
    if (dateConfirmed) {
      onConfirm(internalValue);
    } else {
      setDateConfirmed(true);
    }
  }, [dateConfirmed, internalValue, onConfirm]);

  const accentColor = colors.secondary;
  if (Platform.OS !== 'ios') return null;
  return (
    <Modal
      visible={visible}
      onDismiss={onDismiss}
      style={AppStyles.flex1}
      contentContainerStyle={styles.contentContainerStyle}>
      <Surface elevation={5}>
        {!dateConfirmed ? (
          <DateTimePicker
            mode={'date'}
            display={'inline'}
            locale={locale}
            value={internalValue}
            maximumDate={maximumDate}
            minimumDate={minimumDate}
            minuteInterval={minuteInterval}
            accentColor={accentColor}
            onChange={handleDateChange}
            themeVariant={isDarkTheme ? 'dark' : 'light'}
          />
        ) : (
          <DateTimePicker
            mode={'time'}
            display={'spinner'}
            locale={locale}
            value={internalValue}
            maximumDate={maximumDate}
            minimumDate={minimumDate}
            minuteInterval={minuteInterval}
            accentColor={accentColor}
            onChange={handleTimeChange}
            themeVariant={isDarkTheme ? 'dark' : 'light'}
          />
        )}
        <View style={styles.buttonRow}>
          <Button onPress={onDismiss}>
            {dismissLabel ?? Translation.cancel}
          </Button>
          <Button onPress={handleConfirmPress}>
            {confirmLabel ?? Translation.confirm}
          </Button>
        </View>
      </Surface>
    </Modal>
  );
};

const styles = StyleSheet.create({
  buttonRow: {
    ...AppStyles.rowFlexEnd,
    margin: ThemeSpacing.base,
  },
  contentContainerStyle: {
    marginHorizontal: ThemeSpacing.horizontalScreen,
  },
});
