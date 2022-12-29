import { isTablet } from 'react-native-device-info';

export const ThemeSpacing = {
  base: 6,
  get horizontalScreen() {
    return isTablet() ? this.base * 3 : this.base * 2;
  },
  get verticalScreen() {
    return this.base * 2;
  },
} as const;
