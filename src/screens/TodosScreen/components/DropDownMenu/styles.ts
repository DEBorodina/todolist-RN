import styled from 'styled-components/native';

export const Menu = styled.View`
  top: 8px;
  position: relative;
`;

export const Popup = styled.View`
  position: absolute;
  right: -16px;
  top: -24px;
  width: 97px;
  align-items: flex-start;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.primaryInverted};
  z-index: 2;
  padding: 8px 8px 4px;
  box-shadow: 1px 1px 4px #00000040;
  elevation: 3;
`;

export const Item = styled.TouchableOpacity`
  padding: 0 6px;
  border-radius: 6px;
  margin-bottom: 4px;
`;

export const Dot = styled.View`
  width: 4px;
  height: 4px;
  border-radius: 2px;
  background-color: ${({ theme }) => theme.colors.gray};
  margin-bottom: 4px;
`;
