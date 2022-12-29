import { useCallback } from 'react';

import { useNavigation } from '@react-navigation/native';

import { Tracker, useDeleteTracker } from '../../../data-access';
import { useDeleteTrackerDialog } from '../delete-tracker-dialog';

interface UseTrackerMenuParams {
  goToEditTrackerContext: () => void;
  dismissBottomSheet: () => void;
  onError: (e: Error) => void;
  tracker: Tracker | null;
}

export const useTrackerMenu = ({
  goToEditTrackerContext,
  dismissBottomSheet,
  tracker,
  onError,
}: UseTrackerMenuParams) => {
  const { goBack } = useNavigation();

  const { deleteTracker } = useDeleteTracker({
    tracker,
    onSuccess: goBack,
    onError,
  });

  const { deleteDialog, openDeleteDialog } = useDeleteTrackerDialog({
    deleteTracker,
    tracker,
  });

  const onDeleteTrackerPress = useCallback(() => {
    dismissBottomSheet();
    openDeleteDialog();
  }, [dismissBottomSheet, openDeleteDialog]);

  return {
    onEditTrackerPress: goToEditTrackerContext,
    onDeleteTrackerPress,
    deleteDialog,
  };
};
