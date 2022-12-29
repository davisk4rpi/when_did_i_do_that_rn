// TODO Consider that maybe this should live in a different lib?

import React, { PropsWithChildren } from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider as PaperProvider } from 'react-native-paper';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';

import { NavigationContainer } from '@react-navigation/native';

import { RealmContext } from '../data-access';
import { PreferencesContext } from './PreferencesContext';
import {
  DarkTheme,
  LightTheme,
  NavigationDarkTheme,
  NavigationLightTheme,
} from './theme';

const { RealmProvider } = RealmContext;

export const AppProvider = ({ children }: PropsWithChildren<{}>) => {
  const [isThemeDark, setIsThemeDark] = React.useState(false);

  let theme = isThemeDark ? DarkTheme : LightTheme;

  const toggleTheme = React.useCallback(() => {
    return setIsThemeDark(prev => !prev);
  }, []);

  const preferences = React.useMemo(
    () => ({
      toggleTheme,
      isThemeDark,
    }),
    [toggleTheme, isThemeDark],
  );

  const styles = React.useMemo(
    () =>
      StyleSheet.create({
        screen: {
          flex: 1,
          backgroundColor: theme.colors.background,
        },
        flex1: {
          flex: 1,
        },
      }),
    [theme],
  );

  return (
    <SafeAreaProvider
      style={styles.screen}
      initialMetrics={initialWindowMetrics}>
      <RealmProvider>
        <PreferencesContext.Provider value={preferences}>
          <PaperProvider theme={theme}>
            <NavigationContainer
              theme={isThemeDark ? NavigationDarkTheme : NavigationLightTheme}>
              <GestureHandlerRootView style={styles.flex1}>
                {children}
              </GestureHandlerRootView>
            </NavigationContainer>
          </PaperProvider>
        </PreferencesContext.Provider>
      </RealmProvider>
    </SafeAreaProvider>
  );
};
