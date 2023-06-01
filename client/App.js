import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from './navigation/index.jsx';

function App() {
  return (
    <NavigationContainer>
      <AppNavigation/>
    </NavigationContainer>
  );
}

export default App;
