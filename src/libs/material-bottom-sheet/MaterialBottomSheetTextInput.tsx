import React from 'react';
import { TextInput, TextInputProps } from 'react-native-paper';

import { BottomSheetTextInput } from '@gorhom/bottom-sheet';

export const MaterialBottomSheetTextInput = (
  props: Omit<TextInputProps, 'render' | 'theme'>,
) => {
  return (
    <TextInput
      {...props}
      render={({ ref: _ref, ...props }) => <BottomSheetTextInput {...props} />}
    />
  );
};
