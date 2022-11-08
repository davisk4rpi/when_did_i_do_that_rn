import React from 'react';
import { Appbar, Switch } from 'react-native-paper';

import { NativeStackHeaderProps } from '@react-navigation/native-stack';

import { PreferencesContext } from '../../app-context';
import { isStringOrUndefined } from '../../utililities';

export const Header = ({
  navigation,
  back,
  route,
  options,
}: NativeStackHeaderProps) => {
  const { toggleTheme, isThemeDark } = React.useContext(PreferencesContext);
  const headerTitle = options?.headerTitle;
  if (!isStringOrUndefined(headerTitle)) {
    return null;
  }
  return (
    <Appbar.Header>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={headerTitle ?? route?.name} />
      {!back ? (
        <Switch value={isThemeDark} onValueChange={toggleTheme} />
      ) : null}
    </Appbar.Header>
  );
};
