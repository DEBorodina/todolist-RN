import React, { FC } from 'react';
import { StatusBar as NativeStatusBar } from 'react-native';
import { useTheme } from 'styled-components/native';

import { StatusBarLayout, StyledStatusBarIos } from './styles';
import { StatusBarProps } from './types';

export const StatusBar: FC<StatusBarProps> = ({ children }) => {
  const { colors } = useTheme();

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
