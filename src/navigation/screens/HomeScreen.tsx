import React, { useCallback, useMemo } from 'react';
import { ViewStyle } from 'react-native';

import { Translation } from '../../app-context';
import { NewTrackerFAB, Screen } from '../../components';
import { TrackerHomeScreenFlatList } from '../../features';
import { InputError, useAppSnackBar, useViewLayout } from '../../utililities';

export const HomeScreen = () => {
  const [fabLayout, onFabLayout] = useViewLayout();
  const verticalPadding = (fabLayout?.height ?? 0) + (fabLayout?.y ?? 0);
  const snackBarWrapperStyle: ViewStyle = useMemo(
    () => ({
      position: 'absolute',
      bottom: verticalPadding,
      left: 0,
      right: 0,
    }),
    [verticalPadding],
  );

  const { snackBar, addSnackBarToQueue } = useAppSnackBar(snackBarWrapperStyle);

  const handleError = useCallback(
    (e: Error) => {
      if (e instanceof InputError) {
        addSnackBarToQueue({ message: e.message });
        return;
      }
      addSnackBarToQueue({ message: Translation.errors.unknownErrorYikes });
    },
    [addSnackBarToQueue],
  );

  const contentContainerStyle = useMemo(
    () => ({
      paddingBottom: verticalPadding,
    }),
    [verticalPadding],
  );

  return (
    <Screen>
      <TrackerHomeScreenFlatList
        onError={handleError}
        contentContainerStyle={contentContainerStyle}
      />
      <NewTrackerFAB onLayout={onFabLayout} />
      {snackBar}
    </Screen>
  );
};
