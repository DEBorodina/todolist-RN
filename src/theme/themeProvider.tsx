import React, { FC, ReactNode, useEffect, useMemo } from 'react';
import { ThemeProvider } from 'styled-components/native';

import { THEME } from '@constants';
import { selectSetTheme, selectTheme, useStore } from '@store';
import { getAsyncStorageItem } from '@utils';

import { LIGHT } from './constants';
import { colors } from './theme';

export const GlobalThemeProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const theme = useStore(selectTheme);
  const setTheme = useStore(selectSetTheme);

  useEffect(() => {
    const getTheme = async () => {
      const savedTheme = await getAsyncStorageItem(THEME);
      setTheme(savedTheme);
    };

    getTheme();
  }, [setTheme]);

  const themeValue = useMemo(
    () => ({
      colors: colors[theme ?? LIGHT],
    }),
    [theme],
  );

  /* istanbul ignore next */
  if (!themeValue) {
    return null;
  }

  return <ThemeProvider theme={themeValue}>{children}</ThemeProvider>;
};
