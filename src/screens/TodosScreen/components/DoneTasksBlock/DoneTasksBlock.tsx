import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from 'styled-components/native';

import { Text } from '@components/atoms/Text';

import { Container, Line, StyledDoneTasksBlock } from './styles';
import { DoneTasksBlockProps } from './types';

export const DoneTasksBlock: FC<DoneTasksBlockProps> = ({
  tasksAmount,
  isOpen,
  onPress,
}) => {
  const {
    colors: { text },
  } = useTheme();

  const title = `Done tasks (${tasksAmount})`;
  const icon = isOpen ? 'chevron-up' : 'chevron-down';

  return (
    <StyledDoneTasksBlock>
      <Line />
      <Container>
        <Text color="gray">{title}</Text>
        <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
          <Icon name={icon} size={20} color={text.primary} testID={icon} />
        </TouchableOpacity>
      </Container>
    </StyledDoneTasksBlock>
  );
};
