import { RenderOptions, render } from '@testing-library/react-native';
import React, { ReactElement } from 'react';

import { GlobalThemeProvider } from './src/theme';

const AllTheProviders = ({ children }: { children: JSX.Element }) => {
  return <GlobalThemeProvider>{children}</GlobalThemeProvider>;
};

const customRender = (ui: ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react-native';
export { customRender as render };
