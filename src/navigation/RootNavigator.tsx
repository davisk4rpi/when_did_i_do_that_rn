import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Translation } from '../app-context';
import { Header } from '../components';
import { HomeScreen, NewTrackerScreen, TrackerScreen } from './screens';
import { RootStackParamList } from './types';

const RootStack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  return (
    <RootStack.Navigator
      screenOptions={{
        header: props => <Header {...props} />,
      }}>
      <RootStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: Translation.whenDidIDoThat,
        }}
      />
      <RootStack.Group screenOptions={{ presentation: 'modal' }}>
        <RootStack.Screen
          name="NewTracker"
          component={NewTrackerScreen}
          options={{
            header: undefined,
            title: Translation.addANewTracker,
            headerBackVisible: true,
          }}
        />
        <RootStack.Screen
          name="Tracker"
          component={TrackerScreen}
          options={({ route }) => ({
            header: undefined,
            headerBackVisible: true,
            title: route.params.name,
          })}
        />
      </RootStack.Group>
    </RootStack.Navigator>
  );
};
