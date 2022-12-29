import React, { useCallback, useState } from 'react';

import { Tracker } from '../../../data-access';
import { DeleteTrackerDialog } from './DeleteTrackerDialog';

interface UseDeleteTrackerDialogParams {
  deleteTracker: () => void;
  tracker: Tracker | null;
}

export const useDeleteTrackerDialog = ({
  deleteTracker,
  tracker,
}: UseDeleteTrackerDialogParams) => {
  const [dialogVisible, setDialogVisible] = useState(false);
  const closeDeleteDialog = useCallback(() => {
    setDialogVisible(false);
  }, []);
  const openDeleteDialog = useCallback(() => {
    setDialogVisible(true);
  }, []);

  const handleDeleteTracker = useCallback(() => {
    deleteTracker();
    closeDeleteDialog();
  }, [deleteTracker, closeDeleteDialog]);

  const deleteDialog = tracker && (
    <DeleteTrackerDialog
      visible={dialogVisible}
      onDismiss={closeDeleteDialog}
      onDeleteTracker={handleDeleteTracker}
      tracker={tracker}
    />
  );

  return {
    openDeleteDialog,
    deleteDialog,
  };
};
