/* istanbul ignore file */
import React, { useEffect } from 'react';
import BootSplash from 'react-native-bootsplash';
import { EventProvider } from 'react-native-outside-press';

import { StatusBar } from '@components/atoms/StatusBar';
import { ModalPortal, ModalProvider } from '@components/molecules/Modal';
import { GlobalThemeProvider } from '@theme';

import { Navigator } from './navigation/Navigator';

function App(): React.JSX.Element {
  useEffect(() => {
    BootSplash.hide({ fade: true });
  }, []);

  return (
    <EventProvider>
      <ModalProvider>
        <GlobalThemeProvider>
          <StatusBar>
            <Navigator />
          </StatusBar>
          <ModalPortal />
        </GlobalThemeProvider>
      </ModalProvider>
    </EventProvider>
  );
}

export default App;
