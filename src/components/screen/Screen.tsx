import React, { useMemo } from 'react';
import { StyleSheet, View, ViewProps, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useHeaderHeight } from '@react-navigation/elements';

import { AppStyles, ThemeSpacing } from '../../app-context';

export const DEFAULT_SCREEN_STYLE: ViewStyle = {
  flex: 1,
  paddingBottom: ThemeSpacing.verticalScreen,
  paddingHorizontal: ThemeSpacing.horizontalScreen,
};

export const Screen = ({ style, testID, ...props }: ViewProps) => {
  const headerHeight = useHeaderHeight();

  const internalStyle = useMemo(() => {
    return StyleSheet.compose({ marginTop: headerHeight }, style);
  }, [headerHeight, style]);

  return (
    <SafeAreaView
      style={AppStyles.flex1}
      mode="padding"
      edges={['bottom', 'left', 'right']}>
      <View
        testID={testID}
        style={[DEFAULT_SCREEN_STYLE, internalStyle]}
        {...props}
      />
    </SafeAreaView>
  );
};
