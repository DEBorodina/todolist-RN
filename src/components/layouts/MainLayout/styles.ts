import styled from 'styled-components/native';

export const StyledMainLayout = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.primaryBackground};
`;

export const StyledBackground = styled.ImageBackground`
  width: 100%;
  aspect-ratio: 1;
  justify-content: center;
  align-items: center;
  top: -50px;
  position: absolute;
`;
