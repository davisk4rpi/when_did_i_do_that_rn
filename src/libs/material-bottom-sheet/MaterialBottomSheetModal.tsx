import React, { useCallback, useMemo } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';

import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetModalProps,
} from '@gorhom/bottom-sheet';
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';

import { useTheme } from '../../app-context';
import { useMaterialBottomSheetModalRef } from './material-bottom-sheet-modal-ref.hook';

export type MaterialBottomSheetBackdropParams = Pick<
  BottomSheetDefaultBackdropProps,
  'appearsOnIndex' | 'disappearsOnIndex' | 'pressBehavior'
>;

export interface MaterialBottomSheetModalProps
  extends Omit<
    BottomSheetModalProps,
    | 'ref'
    | 'style'
    | 'backgroundStyle'
    | 'containerStyle'
    | 'handleStyle'
    | 'handleIndicatorStyle'
    | 'backdropComponent'
  > {
  backdrop?: MaterialBottomSheetBackdropParams;
}

const BOTTOM_SHEET_MAX_WIDTH = 640;

export const MaterialBottomSheetModal = ({
  children,
  backdrop,
  ...props
}: MaterialBottomSheetModalProps) => {
  const { colors, elevation } = useTheme();
  const { width } = useWindowDimensions();
  const { ref } = useMaterialBottomSheetModalRef();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        background: {
          backgroundColor: colors.elevation.level1,
          borderTopRightRadius: 28,
          borderTopLeftRadius: 28,
        },
        backdrop: {
          backgroundColor: colors.backdrop,
          flex: 1,
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        },
        bottomSheet: {
          flexBasis: BOTTOM_SHEET_MAX_WIDTH,
          marginHorizontal: width > 640 ? (width - 640) / 2 : 0,
          backgroundColor: colors.elevation.level0,
          ...elevation.level1,
        },
        handleIndicator: {
          backgroundColor: colors.onSurfaceVariant,
          width: 32,
          height: 4,
          opacity: 0.4,
        },
      }),
    [colors, width, elevation],
  );

  const Backdrop = useCallback(
    (props: BottomSheetBackdropProps) => {
      return (
        <BottomSheetBackdrop
          {...props}
          {...backdrop}
          style={styles.backdrop}
          opacity={1}
        />
      );
    },
    [backdrop, styles],
  );
  return (
    <BottomSheetModal
      ref={ref}
      {...props}
      style={styles.bottomSheet}
      backgroundStyle={styles.background}
      handleIndicatorStyle={styles.handleIndicator}
      backdropComponent={backdrop === undefined ? undefined : Backdrop}>
      {children}
    </BottomSheetModal>
  );
};
