import React, { useEffect, useMemo, useState } from 'react';
import {
  Animated,
  Keyboard,
  StyleSheet,
  ViewProps,
  ViewStyle,
} from 'react-native';

import { ThemeSpacing } from '../../app-context';

export const KeyboardAvoidingScreen = (props: Omit<ViewProps, 'style'>) => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const willShowSubscription = Keyboard.addListener('keyboardWillShow', e => {
      Keyboard.scheduleLayoutAnimation(e);
      setKeyboardHeight(e.endCoordinates.height);
    });
    const willHideSubscription = Keyboard.addListener('keyboardWillHide', e => {
      Keyboard.scheduleLayoutAnimation(e);
      setKeyboardHeight(0);
    });

    return () => {
      willHideSubscription.remove();
      willShowSubscription.remove();
    };
  }, []);

  const style = useMemo(() => {
    return StyleSheet.compose<ViewStyle>(styles.screen, {
      paddingBottom: ThemeSpacing.verticalScreen + keyboardHeight,
    });
  }, [keyboardHeight]);

  return <Animated.View {...props} style={style} />;
};

const styles = StyleSheet.create({
  keyboard: { flex: 1 },
  screen: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: ThemeSpacing.verticalScreen,
    paddingHorizontal: ThemeSpacing.verticalScreen,
  },
});
