import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RealmContext } from './src';
const { RealmProvider } = RealmContext;

const Stack = createNativeStackNavigator();
export const App = () => {
  // If sync is disabled, setup the app without any sync functionality and return early
  return (
    <SafeAreaView style={styles.screen}>
      <RealmProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </RealmProvider>
    </SafeAreaView>
  );
};

function HomeScreen() {
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#ff00aa',
  },
});
export default App;
