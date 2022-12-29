import React from 'react';
import { Button, Dialog, DialogProps, Paragraph } from 'react-native-paper';

import { Translation } from '../../../app-context';
import { Tracker } from '../../../data-access';

interface DeleteTrackerDialogProps
  extends Pick<Required<DialogProps>, 'onDismiss'> {
  tracker: Tracker;
  visible: boolean;
  onDeleteTracker: () => void;
}

export const DeleteTrackerDialog = ({
  onDeleteTracker,
  onDismiss,
  tracker,
  visible,
}: DeleteTrackerDialogProps) => {
  return (
    <Dialog visible={visible} onDismiss={onDismiss}>
      <Dialog.Title>{Translation.deleteThing(tracker.name)}</Dialog.Title>
      <Dialog.Content>
        <Paragraph>{Translation.thisWillDeleteTracker(tracker.name)}</Paragraph>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={onDismiss}>{Translation.cancel}</Button>
        <Button onPress={onDeleteTracker}>{Translation.yes}</Button>
      </Dialog.Actions>
    </Dialog>
  );
};
