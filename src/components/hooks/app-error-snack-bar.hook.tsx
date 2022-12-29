import { useCallback } from 'react';
import { ViewStyle } from 'react-native';

import { InputError } from '../../libs/utililities/errors';
import { useAppSnackBar } from './app-snack-bar.hook';

export const useAppErrorSnackBar = (
  wrapperStyle: ViewStyle,
  unknownErrorMessage = 'Unknown Error... Yikes :(',
) => {
  const { snackBar, addSnackBarToQueue } = useAppSnackBar(wrapperStyle);

  const addErrorToSnackBarQueue = useCallback(
    (e: Error) => {
      if (e instanceof InputError) {
        addSnackBarToQueue({ message: e.message });
        return;
      }
      addSnackBarToQueue({ message: unknownErrorMessage });
    },
    [addSnackBarToQueue, unknownErrorMessage],
  );

  return {
    snackBar,
    addSnackBarToQueue,
    addErrorToSnackBarQueue,
  };
};
