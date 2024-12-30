import styled from 'styled-components/native';

export const StyledTaskCard = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.primaryInverted};
  width: 90%;
  padding: 16px;
  border-radius: 16px;
  flex-direction: row;
  justify-content: space-between;
  box-shadow: 1px 1px 4px #00000040;
  elevation: 10;
  margin: 0px auto 8px;
`;

export const Content = styled.View`
  flex-direction: row;
`;

export const CheckBoxContainer = styled.View`
  margin-right: 8px;
  top: 8px;
`;

export const SubtasksContainer = styled.View`
  flex-direction: row;
  margin: 8px 0;
`;
