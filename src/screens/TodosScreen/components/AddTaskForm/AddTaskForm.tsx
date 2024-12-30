import React, { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import uuid from 'react-native-uuid';
import Icon from 'react-native-vector-icons/Fontisto';

import { Button } from '@components/atoms/Button';
import { Input } from '@components/atoms/Input';
import { Text } from '@components/atoms/Text';
import { useModal } from '@components/molecules/Modal';
import { Select } from '@components/molecules/Select';
import { Category, Subtask, addTask } from '@firestore';
import {
  selectCategories,
  selectSetCategories,
  selectUserId,
  useStore,
} from '@store';

import { AddTaskFormProps, FromState } from './types';

export const AddTaskForm: FC<AddTaskFormProps> = ({
  setTasks,
  setOpenedTaskId,
}) => {
  const { control, handleSubmit } = useForm<FromState>();
  const [isLoading, setIsLoading] = useState(false);
  const [displayedCategories, setDisplayedCategories] = useState<Category[]>(
    [],
  );

  const categories = useStore(selectCategories);
  const setCategories = useStore(selectSetCategories);
  const userId = useStore(selectUserId);
  const { setIsOpen } = useModal();

  const handleCategoryChange =
    (onChange: (value: string) => void) => (value: string) => {
      onChange(value);

      const newCategories = categories
        .filter(({ name }) =>
          name.toLocaleLowerCase().includes(value.toLowerCase()),
        )
        .slice(0, 5);

      setDisplayedCategories(newCategories);
    };

  const handleChangeSubtask =
    (
      onChange: (subtasks: Subtask[]) => void,
      subtasks: Subtask[],
      index?: number,
    ) =>
    (value?: string) => {
      if (value !== undefined && index !== undefined) {
        subtasks[index].title = value;
      } else if (
        !subtasks.find(subtask => !subtask.title) &&
        subtasks.length < 5
      ) {
        subtasks.push({ title: '', id: uuid.v4(), isDone: false });
      }

      onChange(subtasks);
    };

  const onSubmit = async (data: FromState) => {
    setIsLoading(true);

    const subtasks = data.subtasks.filter(subtask => !!subtask.title);
    const currentCategory = categories.find(
      ({ name }) => name === data.category,
    )!!;

    currentCategory.tasksAmount += 1;
    setCategories([...categories]);

    const newTask = {
      ...data,
      categoryId: currentCategory.id,
      subtasks,
      userId: userId ?? '',
      isDone: false,
    };
    const newTaskId = await addTask(newTask);

    setOpenedTaskId(newTaskId);
    setTasks(prev => [{ ...newTask, id: newTaskId }, ...prev]);
    setIsOpen(false);
    setIsLoading(false);
  };

  return (
    <>
      <Text styler={{ marginBottom: 24 }} view="medium-l">
        Add task
      </Text>
      <Controller
        control={control}
        render={({
          field: { onBlur, onChange, value },
          fieldState: { error },
        }) => (
          <>
            <Input
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Title"
            />
            <Text view="light-s" textAlign="left" styler={{ marginLeft: 8 }}>
              {String(error?.message ?? '')}
            </Text>
          </>
        )}
        name="title"
        rules={{ required: 'required' }}
      />
      <Controller
        control={control}
        render={({
          field: { onBlur, onChange, value },
          fieldState: { error },
        }) => (
          <>
            <Input
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Description"
            />
            <Text view="light-s" textAlign="left" styler={{ marginLeft: 8 }}>
              {String(error?.message ?? '')}
            </Text>
          </>
        )}
        name="description"
        rules={{ required: 'required' }}
      />
      <Controller
        control={control}
        render={({
          field: { onBlur, onChange, value },
          fieldState: { error },
        }) => (
          <>
            <Select
              placeholder="Category"
              onBlur={onBlur}
              onChangeText={handleCategoryChange(onChange)}
              value={value}
              items={displayedCategories.map(category => category.name)}
              renderItem={item => <Text>{item}</Text>}
            />
            <Text view="light-s" textAlign="left" styler={{ marginLeft: 8 }}>
              {String(error?.message ?? '')}
            </Text>
          </>
        )}
        name="category"
        rules={{
          required: 'required',
          validate: value =>
            categories.find(({ name }) =>
              name.toLocaleLowerCase().includes(value.toLowerCase()),
            )
              ? true
              : 'Must be from the list',
        }}
      />
      <Controller
        control={control}
        render={({ field: { onBlur, onChange, value } }) => (
          <>
            {value?.map((subtask, index) => (
              <Input
                key={index}
                onBlur={onBlur}
                onChangeText={handleChangeSubtask(onChange, value, index)}
                value={subtask.title}
                placeholder="Subtask"
                styler={{ marginBottom: 8 }}
              />
            ))}
            {value?.length < 5 && (
              <Button
                styler={{ margin: '0 auto' }}
                size="circle-m"
                onClick={() => handleChangeSubtask(onChange, value)()}>
                <Icon name="plus-a" size={19} color="#fff" />
              </Button>
            )}
          </>
        )}
        name="subtasks"
        defaultValue={[]}
      />
      <Button
        onClick={handleSubmit(onSubmit)}
        styler={{ marginTop: 24 }}
        isLoading={isLoading}>
        <Text view="medium-m" color="primaryInverted">
          add
        </Text>
      </Button>
    </>
  );
};
