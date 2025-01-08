import Icon from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components/native';

export const Item = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin: 16px;
`;

export const ItemIcon = styled(Icon)`
  margin-right: 8px;
`;

export const ArrowIcon = styled(Icon)`
  margin: 16px;
`;
