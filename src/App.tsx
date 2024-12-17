import React from 'react';

import { StatusBar } from '@components/atoms/StatusBar';
import { GlobalThemeProvider } from '@theme';

import { Navigator } from './navigation/Navigator';

function App(): React.JSX.Element {
  return (
    <GlobalThemeProvider>
      <StatusBar>
        <Navigator />
      </StatusBar>
    </GlobalThemeProvider>
  );
}

export default App;
