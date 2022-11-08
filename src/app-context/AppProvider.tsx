import React, { PropsWithChildren } from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

import { NavigationContainer } from '@react-navigation/native';

import { RealmContext } from '../data-access';
import { PreferencesContext } from './PreferencesContext';
import { DarkTheme, LightTheme } from './theme';

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
      }),
    [theme],
  );

  return (
    <SafeAreaView style={styles.screen}>
      <RealmProvider>
        <PreferencesContext.Provider value={preferences}>
          <PaperProvider theme={theme}>
            <StatusBar
              barStyle={isThemeDark ? 'light-content' : 'dark-content'}
              backgroundColor={theme.colors.background}
            />
            <NavigationContainer theme={theme}>{children}</NavigationContainer>
          </PaperProvider>
        </PreferencesContext.Provider>
      </RealmProvider>
    </SafeAreaView>
  );
};
