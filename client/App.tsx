import 'react-native-gesture-handler';
import * as React from 'react';
import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';
import { store, persistor} from './src/redux/store';
import AppNavigation from './src/navigation/index';

function App() {
  return (
    <Provider store={store}>
      {/* // <PersistGate loading={null} persistor={persistor}> */}
        <NavigationContainer>
            <AppNavigation/>
        </NavigationContainer>
      {/* // </PersistGate> */}
    </Provider>
  );
}

export default App;
