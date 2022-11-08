import React from 'react';

import { AppProvider, RootNavigator } from './src';

export const App = () => {
  return (
    <AppProvider>
      <RootNavigator />
    </AppProvider>
  );
};

export default App;
