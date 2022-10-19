import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AppProvider, HomeScreen, NewTrackerScreen } from './src';
import { Header } from './src/components';
import { RootStackParamList } from './src/navigation';

const RootStack = createNativeStackNavigator<RootStackParamList>();

export const App = () => {
  // If sync is disabled, setup the app without any sync functionality and return early
  return (
    <AppProvider>
      <RootStack.Navigator
        screenOptions={{
          header: props => <Header {...props} />,
        }}>
        <RootStack.Screen name="Home" component={HomeScreen} />
        <RootStack.Group screenOptions={{ presentation: 'modal' }}>
          <RootStack.Screen
            name="NewTracker"
            component={NewTrackerScreen}
            options={{
              header: undefined,
              title: 'Add a New Tracker',
              headerBackVisible: true,
            }}
          />
        </RootStack.Group>
      </RootStack.Navigator>
    </AppProvider>
  );
};

export default App;
