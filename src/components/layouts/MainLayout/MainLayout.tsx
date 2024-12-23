import React, { FC } from 'react';

import { StyledBackground, StyledMainLayout } from './styles';
import { MainLayoutProps } from './types';

export const MainLayout: FC<MainLayoutProps> = ({ children }) => (
  <StyledMainLayout>
    <StyledBackground
      source={require('assets/images/layout.png')}
      resizeMode="cover"
    />
    {children}
  </StyledMainLayout>
);
