import styled from 'styled-components/native';

export const StyledScrollView = styled.ScrollView`
  width: 100%;
`;

export const StyledCategoryCardsSection = styled.View`
  width: 328px;
  flex-direction: row;
  gap: 14px;
  flex-wrap: wrap;
  margin: 0 auto;
  padding-bottom: 32px;
`;

export const AddButton = styled.TouchableOpacity`
  width: 100px;
  height: 100px;
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.colors.pink};
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.primaryInverted};
`;
