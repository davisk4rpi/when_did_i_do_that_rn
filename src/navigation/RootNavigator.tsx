import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ThemeToggle, Translation } from '../app-context';
import { HomeScreen, NewTrackerScreen, TrackerScreen } from '../screens';
import { RootStackParamList } from './types';

const RootStack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  return (
    <RootStack.Navigator screenOptions={{ headerTransparent: true }}>
      <RootStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: Translation.whenDidIDoThat,
          headerRight: ThemeToggle,
        }}
      />
      {/* <RootStack.Group
        screenOptions={{
          presentation: Platform.OS === 'ios' ? 'modal' : 'card',
        }}> */}
      <RootStack.Screen
        name="NewTracker"
        component={NewTrackerScreen}
        options={{
          title: Translation.addANewTracker,
          headerBackVisible: true,
        }}
      />
      <RootStack.Screen
        name="Tracker"
        component={TrackerScreen}
        options={({ route }) => ({
          title: route.params.name,
          headerBackVisible: true,
        })}
      />
      {/* </RootStack.Group> */}
    </RootStack.Navigator>
  );
};
