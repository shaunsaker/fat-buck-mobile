import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import { Router } from './Router';
import { colors } from './colors';
import { CodePushHandler } from './components/CodePushHandler';
import { ErrorBoundary } from './components/ErrorBoundary';

console.disableYellowBox = true;

const App = () => {
  // require('react').useEffect(() => {
  //   persistor.purge();
  // }, []);

  return (
    <Provider store={store}>
      <ErrorBoundary>
        <PersistGate loading={null} persistor={persistor}>
          <StatusBar barStyle="light-content" backgroundColor={colors.black} />

          <Router />

          <CodePushHandler />
        </PersistGate>
      </ErrorBoundary>
    </Provider>
  );
};

export default App;
