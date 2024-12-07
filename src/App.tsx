import React from 'react';
import { Provider } from 'react-redux';

import { StatusBar } from '@components/atoms/StatusBar';
import { store } from '@store';
import { GlobalThemeProvider } from '@theme';

import { Navigator } from './navigation/Navigator';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <GlobalThemeProvider>
        <StatusBar>
          <Navigator />
        </StatusBar>
      </GlobalThemeProvider>
    </Provider>
  );
}

export default App;
