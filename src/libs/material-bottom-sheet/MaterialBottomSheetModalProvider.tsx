import React, { PropsWithChildren, useMemo, useState } from 'react';

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';

import {
  MaterialBottomSheetModalContext,
  MaterialBottomSheetModalContextValue,
  noOpBottomSheetMethods,
} from './MaterialBottomSheetModalContext';

interface MaterialBottomSheetModalProviderProps {
  value?: MaterialBottomSheetModalContextValue;
}

export const MaterialBottomSheetModalProvider = ({
  children,
  value,
}: PropsWithChildren<MaterialBottomSheetModalProviderProps>) => {
  const _value = useMaterialBottomSheetModalProviderValue(value);

  return (
    <MaterialBottomSheetModalContext.Provider value={_value}>
      <BottomSheetModalProvider children={children} />
    </MaterialBottomSheetModalContext.Provider>
  );
};

export const useMaterialBottomSheetModalProviderValue = (
  value?: MaterialBottomSheetModalContextValue,
) => {
  const [bottomSheetMethods, setBottomSheetMethods] =
    useState<BottomSheetModalMethods>(noOpBottomSheetMethods);

  return useMemo(
    () => value ?? { ...bottomSheetMethods, setBottomSheetMethods },
    [value, bottomSheetMethods, setBottomSheetMethods],
  );
};
