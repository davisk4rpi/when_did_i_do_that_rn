import { useCallback, useEffect, useState } from 'react';

import { DateTimePickerEvent } from '@react-native-community/datetimepicker';

interface UseTwoStepDateTimePickerParams {
  onConfirm: (newDateTime?: Date) => void;
  onDismiss: () => void;
  value: Date;
}
export const useTwoStepDateTimePicker = ({
  value,
  onConfirm,
  onDismiss,
}: UseTwoStepDateTimePickerParams) => {
  const [confirmedDate, setConfirmedDate] = useState<Date | undefined>();

  useEffect(() => {
    setConfirmedDate(undefined);
  }, [value]);

  const handleDateChange = useCallback(
    (event: DateTimePickerEvent, date?: Date) => {
      if (event.type === 'set') {
        if (date === undefined) return onConfirm(undefined);
        setConfirmedDate(date);
      } else if (event.type === 'dismissed') {
        setConfirmedDate(undefined);
        onDismiss();
      }
    },
    [onDismiss, onConfirm],
  );

  const handleTimeChange = useCallback(
    (event: DateTimePickerEvent, date?: Date) => {
      if (date && event.type === 'set') {
        onConfirm(date);
      } else if (event.type === 'dismissed') {
        setConfirmedDate(undefined);
        onDismiss();
      }
    },
    [onConfirm, onDismiss],
  );
  return { handleDateChange, handleTimeChange, confirmedDate };
};
