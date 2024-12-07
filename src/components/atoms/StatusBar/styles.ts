import styled from 'styled-components/native';

export const StyledStatusBarIos = styled.SafeAreaView`
  flex: 0;
  background-color: ${({ theme }) => theme.colors.secondary};
`;

export const StatusBarLayout = styled.SafeAreaView`
  flex: 1;
`;
