import React from 'react';
import { Text, View } from 'react-native';

import { Translation } from '../../app-context';
import { Screen } from './Screen';

interface NotFoundScreenProps {
  thing: string;
}

export const NotFoundScreen = ({ thing }: NotFoundScreenProps) => {
  return (
    <Screen>
      <View>
        <Text>{Translation.sorryCouldntFindThat(thing)}</Text>
      </View>
    </Screen>
  );
};
