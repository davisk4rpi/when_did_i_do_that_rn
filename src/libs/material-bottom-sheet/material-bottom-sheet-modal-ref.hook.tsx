import { useEffect, useRef } from 'react';

import { BottomSheetModal } from '@gorhom/bottom-sheet';

import {
  noOpBottomSheetMethods,
  useMaterialBottomSheetModalContext,
} from './MaterialBottomSheetModalContext';

export const useMaterialBottomSheetModalRef = () => {
  const { setBottomSheetMethods, ...bottomSheetMethods } =
    useMaterialBottomSheetModalContext();
  const ref = useRef<BottomSheetModal>(noOpBottomSheetMethods);

  function present(...params: Parameters<BottomSheetModal['present']>) {
    ref.current?.present(...params);
  }
  function close(...params: Parameters<BottomSheetModal['close']>) {
    ref.current?.close(...params);
  }
  function collapse(...params: Parameters<BottomSheetModal['collapse']>) {
    ref.current?.collapse(...params);
  }
  function dismiss(...params: Parameters<BottomSheetModal['dismiss']>) {
    ref.current?.dismiss(...params);
  }
  function expand(...params: Parameters<BottomSheetModal['expand']>) {
    ref.current?.expand(...params);
  }
  function forceClose(...params: Parameters<BottomSheetModal['forceClose']>) {
    ref.current?.forceClose(...params);
  }
  function snapToIndex(...params: Parameters<BottomSheetModal['snapToIndex']>) {
    ref.current?.snapToIndex(...params);
  }
  function snapToPosition(
    ...params: Parameters<BottomSheetModal['snapToPosition']>
  ) {
    ref.current?.snapToPosition(...params);
  }

  useEffect(() => {
    setBottomSheetMethods({
      present,
      close,
      collapse,
      dismiss,
      expand,
      snapToIndex,
      snapToPosition,
      forceClose,
    });

    return () => {
      setBottomSheetMethods(noOpBottomSheetMethods);
    };
  }, [setBottomSheetMethods]);

  return {
    ...bottomSheetMethods,
    ref,
  };
};
