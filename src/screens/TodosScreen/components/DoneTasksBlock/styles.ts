import styled from 'styled-components/native';

export const StyledDoneTasksBlock = styled.View`
  width: 100%;
  align-items: center;
`;

export const Line = styled.View`
  width: 90%;
  background-color: ${({ theme }) => theme.colors.gray};
  height: 1px;
  margin-top: 12px;
`;

export const Container = styled.View`
  margin-top: 8px;
  width: 90%;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 16px;
`;
