import React, { FC } from 'react';
import { FlatList, View } from 'react-native';

import { CheckBox } from '@components/atoms/CheckBox';
import { Text } from '@components/atoms/Text';

import { DropDownMenu } from '../DropDownMenu';

import {
  CheckBoxContainer,
  Content,
  StyledTaskCard,
  SubtasksContainer,
} from './styles';
import { TaskCardProps } from './types';

export const TaskCard: FC<TaskCardProps> = ({
  isOpen,
  isDone,
  title,
  description,
  subtasks,
  onDelete,
  onDone,
  onSubtaskDone,
  onTaskPress,
  onEdit,
}) => {
  const isExpandable = subtasks && subtasks.length > 0;

  return (
    <StyledTaskCard onPress={onTaskPress} activeOpacity={1}>
      <Content>
        <CheckBoxContainer>
          <CheckBox onChange={onDone} isChecked={isDone} />
        </CheckBoxContainer>
        <View>
          <Text view="light-m" textAlign="left">
            {title}
          </Text>
          <Text view="light-s" color="secondary" textAlign="left">
            {description}
          </Text>
          {isOpen && isExpandable && (
            <FlatList
              style={{ marginTop: 8, marginLeft: 32 }}
              data={subtasks}
              renderItem={({ item }) => (
                <SubtasksContainer>
                  <CheckBox
                    onChange={onSubtaskDone(item.id)}
                    isChecked={item.isDone}
                    styler={{ marginRight: 8 }}
                  />
                  <Text view="light-m" textAlign="left">
                    {item.title}
                  </Text>
                </SubtasksContainer>
              )}
            />
          )}
        </View>
      </Content>
      <DropDownMenu onDelete={onDelete} onEdit={onEdit} withEdit={!isDone} />
    </StyledTaskCard>
  );
};
