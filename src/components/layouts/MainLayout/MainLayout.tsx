import fullLayout from 'assets/images/full-layout.png';
import layout from 'assets/images/layout.png';
import React, { FC } from 'react';
import { Platform } from 'react-native';

import { StyledBackground, StyledMainLayout } from './styles';
import { MainLayoutProps } from './types';

export const MainLayout: FC<MainLayoutProps> = ({ children, isFullLayout }) => {
  const isWeb = Platform.OS === 'web';
  const layoutImage = isWeb ? layout : require('assets/images/layout.png');
  const fullLayoutImage = isWeb
    ? fullLayout
    : require('assets/images/full-layout.png');

  const src = isFullLayout ? fullLayoutImage : layoutImage;

  return (
    <StyledMainLayout>
      <StyledBackground
        source={src}
        resizeMode="cover"
        isFullLayout={isFullLayout}
        testID="background"
      />
      {children}
    </StyledMainLayout>
  );
};
