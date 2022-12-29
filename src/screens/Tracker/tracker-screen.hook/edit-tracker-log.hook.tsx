import React, { useCallback, useState } from 'react';

import { Tracker, TrackerLog, useUpdateTrackerLog } from '../../../data-access';
import { DateTimePickerModal } from '../../../libs/react-native-community-datetimepicker';

interface UseEditTrackerLogParams {
  onError: (e: Error) => void;
  tracker: Tracker | null;
}

export const useEditTrackerLog = ({
  onError,
  tracker,
}: UseEditTrackerLogParams) => {
  const [trackerLog, setTrackerLog] = useState<TrackerLog | undefined>();

  const closeModal = useCallback(() => setTrackerLog(undefined), []);

  const { updateTrackerLogDateTime } = useUpdateTrackerLog({
    tracker,
    onError,
    onSuccess: closeModal,
  });

  const onConfirm = useCallback(
    (newDate?: Date) => {
      if (trackerLog === undefined || newDate === undefined) return;
      updateTrackerLogDateTime(trackerLog, newDate);
      setTrackerLog(undefined);
    },
    [trackerLog, updateTrackerLogDateTime],
  );

  const editTrackerLogDatePickerModal = (
    <DateTimePickerModal
      locale="en"
      value={trackerLog?.dateTime ?? new Date()}
      visible={trackerLog !== undefined}
      onConfirm={onConfirm}
      onDismiss={closeModal}
    />
  );

  return {
    updateTrackerLogDateTime,
    editTrackerLogDatePickerModal,
    openTrackerLogTimePickerModal: setTrackerLog,
  };
};
