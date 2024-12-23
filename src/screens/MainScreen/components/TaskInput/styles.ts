import Icon from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components/native';

export const Container = styled.View`
  position: relative;
`;

export const StyledTaskInput = styled.TextInput`
  width: 280px;
  height: 48px;
  padding: 8px 16px 8px 35px;
  background: ${({ theme }) => theme.colors.primaryBackground};
  border-radius: 12px;
  box-shadow: 1px 1px 4px #00000040;
`;

export const SearchIcon = styled(Icon)`
  position: absolute;
  top: 15px;
  left: 10px;
  z-index: 1;
`;
