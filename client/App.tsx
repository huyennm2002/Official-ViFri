import 'react-native-gesture-handler';
import React, {useState} from 'react';
import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';
import { createNavigationContainerRef, NavigationContainer } from '@react-navigation/native';
import { store } from './src/redux/store';
import AppNavigation from './src/navigation/index';

const screenRef = createNavigationContainerRef();
function App() {
  const [ routeName, setRouteName] = useState('');

  return (
    <Provider store={store}>
      {/* // <PersistGate loading={null} persistor={persistor}> */}
        <NavigationContainer 
          ref={screenRef}
          onReady={ () => {
            setRouteName(screenRef.getCurrentRoute().name)
          }}
          onStateChange={
            async () => {
                const currentRouteName = screenRef.getCurrentRoute().name;
                setRouteName(currentRouteName)
            }}>
            <AppNavigation routeName={routeName}/>
        </NavigationContainer>
      {/* // </PersistGate> */}
    </Provider>
  );
}

export default App;
