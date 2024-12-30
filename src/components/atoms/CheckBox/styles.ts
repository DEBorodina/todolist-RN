import styled from 'styled-components/native';

import { StyledCheckBoxProps } from './types';

export const StyledCheckBox = styled.TouchableOpacity<StyledCheckBoxProps>`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  ${({ styler }) => styler}
`;
