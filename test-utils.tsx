import { RenderOptions, render } from '@testing-library/react-native';
import React, { ReactElement } from 'react';
import { ThemeProvider } from 'styled-components/native';

import { colors } from '@theme';

const AllTheProviders = ({ children }: { children: JSX.Element }) => {
  return (
    <ThemeProvider theme={{ colors: colors.DARK }}>{children}</ThemeProvider>
  );
};

const customRender = (ui: ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react-native';
export { customRender as render };
