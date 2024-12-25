import React, { FC, useEffect } from 'react';
import { StatusBar as NativeStatusBar } from 'react-native';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import { useTheme } from 'styled-components/native';

import { StatusBarLayout, StyledStatusBarIos } from './styles';
import { StatusBarProps } from './types';

export const StatusBar: FC<StatusBarProps> = ({ children }) => {
  const { colors } = useTheme();

  useEffect(() => {
    SystemNavigationBar.setNavigationColor(
      'transparent',
      'light',
      'navigation',
    );
  }, []);

  return (
    <>
      <StyledStatusBarIos />
      <NativeStatusBar
        barStyle="light-content"
        backgroundColor={colors.secondary}
      />
      <StatusBarLayout style={{ flex: 1 }}>{children}</StatusBarLayout>
    </>
  );
};
