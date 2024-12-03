import React, { FC } from 'react';
import { Text } from 'react-native';

import { StyledTemplateName } from './styles';
import { TemplateNameProps } from './types';

export const TemplateName: FC<TemplateNameProps> = () => (
  <StyledTemplateName>
    <Text>TemplateName</Text>
  </StyledTemplateName>
);
