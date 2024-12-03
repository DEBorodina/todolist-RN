import styled from 'styled-components/native';

import { fontPresets } from './constants';
import { StyledTextProps } from './types';

export const StyledText = styled.Text<StyledTextProps>`
  ${({ view }) => fontPresets[view]}
  color: ${({ theme, color }) => theme.colors.text[color]};
`;
