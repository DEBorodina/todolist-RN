import React from 'react';

import { StatusBar } from '@components/atoms/StatusBar';
import { ModalPortal, ModalProvider } from '@components/molecules/Modal';
import { GlobalThemeProvider } from '@theme';

import { Navigator } from './navigation/Navigator';

function App(): React.JSX.Element {
  return (
    <ModalProvider>
      <GlobalThemeProvider>
        <StatusBar>
          <Navigator />
        </StatusBar>
        <ModalPortal />
      </GlobalThemeProvider>
    </ModalProvider>
  );
}

export default App;
