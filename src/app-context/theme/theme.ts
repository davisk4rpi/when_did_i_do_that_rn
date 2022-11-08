import merge from 'deepmerge';
import {
  MD3DarkTheme as PaperDarkTheme,
  MD3LightTheme as PaperLightTheme,
} from 'react-native-paper';

import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationLightTheme,
} from '@react-navigation/native';

export const LightTheme = merge(PaperLightTheme, NavigationLightTheme);
export const DarkTheme = merge(PaperDarkTheme, NavigationDarkTheme);
