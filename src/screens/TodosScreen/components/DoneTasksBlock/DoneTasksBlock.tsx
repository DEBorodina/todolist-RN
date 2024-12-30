import React, { FC } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from 'styled-components/native';

import { Text } from '@components/atoms/Text';

import { StyledDoneTasksBlock } from './styles';
import { DoneTasksBlockProps } from './types';

export const DoneTasksBlock: FC<DoneTasksBlockProps> = ({
  tasksAmount,
  isOpen,
  onPress,
}) => {
  const {
    colors: {
      text: { gray, primary },
    },
  } = useTheme();

  const title = `Done tasks (${tasksAmount})`;

  return (
    <StyledDoneTasksBlock>
      <View
        style={{
          width: '90%',
          backgroundColor: gray,
          height: 1,
          marginTop: 12,
        }}
      />
      <View
        style={{
          marginTop: 8,
          width: '90%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 16,
        }}>
        <Text color="gray">{title}</Text>
        <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
          <Icon
            name={isOpen ? 'chevron-up' : 'chevron-down'}
            size={20}
            color={primary}
          />
        </TouchableOpacity>
      </View>
    </StyledDoneTasksBlock>
  );
};
