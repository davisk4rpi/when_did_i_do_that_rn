import merge from 'deepmerge';
import {
  MD3DarkTheme as PaperDarkTheme,
  MD3LightTheme as PaperLightTheme,
  MD3Theme as PaperTheme,
  useTheme as usePaperTheme,
} from 'react-native-paper';

import {
  DarkTheme as _NavigationDarkTheme,
  DefaultTheme as _NavigationLightTheme,
  Theme as NavigationTheme,
} from '@react-navigation/native';

import { DarkThemeColors, LightThemeColors } from './colors';
import { ThemeElevation } from './elevation';

export type AppTheme = PaperTheme & {
  elevation: typeof ThemeElevation;
  isDarkTheme: boolean;
};

const getAdaptedNavigationTheme = (
  navigationTheme: NavigationTheme,
  theme: PaperTheme,
) => {
  return {
    ...navigationTheme,
    colors: {
      ...navigationTheme.colors,
      primary: theme.colors.primary,
      background: theme.colors.background,
      card: theme.colors.elevation.level2,
      text: theme.colors.onSurface,
      border: theme.colors.outline,
      notification: theme.colors.error,
    },
  };
};

const extraLightTheme = {
  roundness: 6,
  elevation: ThemeElevation,
  colors: LightThemeColors,
  isDarkTheme: false,
};

const extraDarkTheme = {
  roundness: 6,
  elevation: ThemeElevation,
  colors: DarkThemeColors,
  isDarkTheme: true,
};

export const LightTheme: AppTheme = merge(PaperLightTheme, extraLightTheme);
export const DarkTheme: AppTheme = merge(PaperDarkTheme, extraDarkTheme);
export const NavigationLightTheme = getAdaptedNavigationTheme(
  _NavigationLightTheme,
  LightTheme,
);
export const NavigationDarkTheme = getAdaptedNavigationTheme(
  _NavigationDarkTheme,
  DarkTheme,
);

export const useTheme = () => usePaperTheme<AppTheme>();
