import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import AppNavigation from './src/navigation/index';

function App() {
  return (
    <NavigationContainer>
      <PaperProvider>
        <AppNavigation/>
      </PaperProvider>
    </NavigationContainer>
  );
}

export default App;
