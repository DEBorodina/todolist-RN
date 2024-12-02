import React, { FC, useMemo } from 'react';
import { ThemeProvider } from 'styled-components/native';

import { LIGHT } from './constants';
import { colors } from './theme';

export const GlobalThemeProvider: FC<{ children: JSX.Element }> = ({
  children,
}) => {
  const defaultTheme = LIGHT;

  const theme = useMemo(
    () => ({
      colors: colors[defaultTheme],
    }),
    [defaultTheme],
  );

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
