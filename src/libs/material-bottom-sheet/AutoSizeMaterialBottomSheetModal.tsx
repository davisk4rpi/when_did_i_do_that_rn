import React, { PropsWithChildren } from 'react';

import {
  BottomSheetView,
  useBottomSheetDynamicSnapPoints,
} from '@gorhom/bottom-sheet';

import {
  MaterialBottomSheetBackdropParams,
  MaterialBottomSheetModal,
  MaterialBottomSheetModalProps,
} from './MaterialBottomSheetModal';

const BACKDROP: MaterialBottomSheetBackdropParams = {
  appearsOnIndex: 0,
  disappearsOnIndex: -1,
};
const DEFAULT_SNAP_POINTS = ['CONTENT_HEIGHT'];

interface AutoSizeMaterialBottomSheetModalProps
  extends Omit<
    MaterialBottomSheetModalProps,
    'snapPoints' | 'handleHeight' | 'contentHeight' | 'backdrop'
  > {}

export const AutoSizeMaterialBottomSheetModal = ({
  children,
}: PropsWithChildren<AutoSizeMaterialBottomSheetModalProps>) => {
  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(DEFAULT_SNAP_POINTS);

  return (
    <MaterialBottomSheetModal
      snapPoints={animatedSnapPoints}
      handleHeight={animatedHandleHeight}
      contentHeight={animatedContentHeight}
      backdrop={BACKDROP}>
      <BottomSheetView onLayout={handleContentLayout}>
        {children}
      </BottomSheetView>
    </MaterialBottomSheetModal>
  );
};
