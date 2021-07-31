import React from 'react';
import AppNavigator from './navigation/AppNavigator';
import {Provider} from 'react-redux';
import {store, sagaMiddleware } from './configs/Store';
import rootSaga from './configs/Saga';

sagaMiddleware.run(rootSaga);
export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
