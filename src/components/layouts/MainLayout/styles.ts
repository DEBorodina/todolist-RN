import styled from 'styled-components/native';

export const StyledMainLayout = styled.View`
  flex: 1;
  align-items: center;
  background: ${({ theme }) => theme.colors.primaryInverted};
`;

export const StyledBackground = styled.ImageBackground`
  width: 100%;
  aspect-ratio: 4/3;
  justify-content: center;
  align-items: center;
  top: -50px;
  position: absolute;
`;
