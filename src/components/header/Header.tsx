import React from 'react';
import { Appbar, Switch } from 'react-native-paper';

import { NativeStackHeaderProps } from '@react-navigation/native-stack';

import { PreferencesContext } from '../../provider/PreferencesContext';

export const Header = ({
  navigation,
  back,
  route,
  options,
}: NativeStackHeaderProps) => {
  const { toggleTheme, isThemeDark } = React.useContext(PreferencesContext);

  return (
    <Appbar.Header>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={options?.headerTitle ?? route?.name} />
      {!back ? (
        <Switch value={isThemeDark} onValueChange={toggleTheme} />
      ) : null}
    </Appbar.Header>
  );
};
