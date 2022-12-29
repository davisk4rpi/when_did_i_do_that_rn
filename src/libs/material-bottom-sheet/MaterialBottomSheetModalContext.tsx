import React from 'react';

import { BottomSheetModal } from '@gorhom/bottom-sheet';

export type MaterialBottomSheetModalContextValue = BottomSheetModal & {
  setBottomSheetMethods: (methods: BottomSheetModal) => void;
};

export const noOpBottomSheetMethods = {
  close: () => {},
  collapse: () => {},
  dismiss: () => {},
  expand: () => {},
  forceClose: () => {},
  present: () => {},
  snapToIndex: () => {},
  snapToPosition: () => {},
};

const initValue: MaterialBottomSheetModalContextValue = {
  ...noOpBottomSheetMethods,
  setBottomSheetMethods: () => {},
};

export const MaterialBottomSheetModalContext =
  React.createContext<MaterialBottomSheetModalContextValue>(initValue);

export const useMaterialBottomSheetModalContext = () =>
  React.useContext(MaterialBottomSheetModalContext);
