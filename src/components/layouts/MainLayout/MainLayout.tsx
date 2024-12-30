import React, { FC } from 'react';

import { StyledBackground, StyledMainLayout } from './styles';
import { MainLayoutProps } from './types';

export const MainLayout: FC<MainLayoutProps> = ({ children, isFullLayout }) => {
  const src = isFullLayout
    ? require('assets/images/full-layout.png')
    : require('assets/images/layout.png');

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
