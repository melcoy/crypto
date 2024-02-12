import React from 'react';
import {Provider} from 'react-redux';

import AppWrapper from './src/components/AppWrapper';
import Routes from './src/routes/Routes';
import {store} from './src/app/store';

function App() {
  return (
    <Provider store={store}>
      <AppWrapper>
        <Routes />
      </AppWrapper>
    </Provider>
  );
}
export default App;
