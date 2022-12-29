import React, { useCallback, useState } from 'react';

import {
  Tracker,
  useDeleteTrackerLog,
  useRealmObject,
  useUpdateTracker,
} from '../../../data-access';
import { useMaterialBottomSheetModalProviderValue } from '../../../libs/material-bottom-sheet';
import { EditTrackerForm } from '../edit-tracker-form';
import { TrackerMenu } from '../tracker-menu';
import { useEditTrackerLog } from './edit-tracker-log.hook';
import { useTrackerMenu } from './tracker-menu.hook';

const onError = (e: Error) => console.log(e);

export const useTrackerScreen = (id: string) => {
  const tracker = useRealmObject<Tracker>(
    'Tracker',
    Realm.BSON.ObjectId.createFromHexString(id),
  );

  const {
    openTrackerMenu,
    goToEditTrackerContext,
    dismissBottomSheet,
    bottomSheetContext,
  } = useTrackerScreenBottomSheet();

  const { onEditTrackerPress, onDeleteTrackerPress, deleteDialog } =
    useTrackerMenu({
      goToEditTrackerContext,
      dismissBottomSheet,
      tracker,
      onError,
    });

  const { updateTrackerName } = useUpdateTracker({
    onUpdateSuccess: dismissBottomSheet,
    onError,
    tracker,
  });

  const { editTrackerLogDatePickerModal, openTrackerLogTimePickerModal } =
    useEditTrackerLog({
      onError,
      tracker,
    });
  const { deleteTrackerLog } = useDeleteTrackerLog({
    onError,
    // onSuccess: onUpdateSuccess,
  });

  let bottomSheetContent: JSX.Element | null = null;

  if (bottomSheetContext === 'trackerMenu') {
    bottomSheetContent = (
      <TrackerMenu
        onEditPress={onEditTrackerPress}
        onDeletePress={onDeleteTrackerPress}
      />
    );
  } else if (tracker && bottomSheetContext === 'editTracker') {
    bottomSheetContent = (
      <EditTrackerForm
        tracker={tracker}
        updateTrackerName={updateTrackerName}
      />
    );
  }

  return {
    tracker,
    deleteDialog,
    bottomSheetContent,
    openTrackerMenu,
    openTrackerLogTimePickerModal,
    deleteTrackerLog,
    editTrackerLogDatePickerModal,
  };
};

export type BottomSheetContext = 'editTracker' | 'trackerMenu';

export const useTrackerScreenBottomSheet = () => {
  const [bottomSheetContext, setBottomSheetContext] =
    useState<BottomSheetContext>('trackerMenu');

  const bottomSheetModal = useMaterialBottomSheetModalProviderValue();

  const openTrackerMenu = useCallback(() => {
    setBottomSheetContext('trackerMenu');
    bottomSheetModal.present();
    bottomSheetModal.expand();
  }, [bottomSheetModal]);

  const goToEditTrackerContext = useCallback(
    () => setBottomSheetContext('editTracker'),
    [],
  );

  return {
    dismissBottomSheet: bottomSheetModal.dismiss,
    openTrackerMenu,
    goToEditTrackerContext,
    bottomSheetContext,
  };
};
