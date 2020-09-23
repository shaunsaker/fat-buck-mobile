import React from 'react';
import { StatusBar } from 'react-native';
import { SideMenu } from './components/SideMenu';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import { Router } from './Router';
import { colors } from './colors';
import { CodePushHandler } from './components/CodePushHandler';

const App = () => {
  // require('react').useEffect(() => {
  //   persistor.purge();
  // }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar barStyle="light-content" backgroundColor={colors.black} />
        <SideMenu>
          <Router />
        </SideMenu>

        <CodePushHandler />
      </PersistGate>
    </Provider>
  );
};

export default App;
