import React, { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import uuid from 'react-native-uuid';
import Icon from 'react-native-vector-icons/Fontisto';

import { Button } from '@components/atoms/Button';
import { Input } from '@components/atoms/Input';
import { Text } from '@components/atoms/Text';
import { useModal } from '@components/molecules/Modal';
import { Select } from '@components/molecules/Select';
import {
  BaseTask,
  Category,
  Subtask,
  Task,
  addFirestoreTask,
  updateFirestoreTask,
} from '@firestore';
import {
  selectCategories,
  selectSetCategories,
  selectUserId,
  useStore,
} from '@store';

import { StarCheckBox } from '../StarCheckBox';

import { AddTaskFormProps, FromState } from './types';

export const AddTaskForm: FC<AddTaskFormProps> = ({
  setTasks,
  setOpenedTaskId,
  defaultValues,
}) => {
  const { control, handleSubmit } = useForm<FromState>({
    defaultValues: {
      subtasks: [],
      isImportant: false,
      ...defaultValues,
    },
  });
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
      subtasks?: Subtask[],
      index?: number,
    ) =>
    (value?: string) => {
      if (!subtasks) {
        subtasks = [];
      }
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

  const addTask = async (newTask: BaseTask, currentCategory: Category) => {
    currentCategory.tasksAmount += 1;
    setCategories([...categories]);

    const newTaskId = await addFirestoreTask(newTask);
    setTasks(prev => [{ ...newTask, id: newTaskId }, ...prev]);

    return newTaskId;
  };

  const updateTask = async (newTask: Task) => {
    await updateFirestoreTask(newTask);
    setTasks(prev => {
      const updatedTaskIndex = prev.findIndex(({ id }) => id === newTask.id);
      prev[updatedTaskIndex] = newTask;

      return [...prev];
    });

    return newTask.id;
  };

  const onSubmit = async (data: FromState) => {
    setIsLoading(true);

    const subtasks = data?.subtasks?.filter(subtask => !!subtask.title);
    const currentCategory = categories.find(
      ({ name }) => name === data.category,
    )!!;

    const newTask = {
      categoryId: currentCategory.id,
      subtasks,
      userId: userId ?? '',
      isDone: false,
      ...data,
    };

    const newTaskId = data.id
      ? await updateTask(newTask as Task)
      : await addTask(newTask, currentCategory);

    setOpenedTaskId(newTaskId);
    setIsOpen(false);
    setIsLoading(false);
  };

  const title = defaultValues?.id ? 'Edit task' : 'Add new task';
  const button = defaultValues?.id ? 'Update' : 'Add';

  return (
    <>
      <Text styler={{ marginBottom: 24 }} view="medium-l">
        {title}
      </Text>
      <View style={{ position: 'absolute', right: 16, top: 16 }}>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <StarCheckBox isChecked={value} onChange={onChange} />
          )}
          name="isImportant"
        />
      </View>
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
      {!defaultValues?.id && (
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
      )}
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
            {!value?.length || value?.length < 5 ? (
              <Button
                styler={{ margin: '0 auto' }}
                size="circle-m"
                onClick={() => handleChangeSubtask(onChange, value)()}>
                <Icon name="plus-a" size={19} color="#fff" />
              </Button>
            ) : null}
          </>
        )}
        name="subtasks"
      />
      <Button
        onClick={handleSubmit(onSubmit)}
        styler={{ marginTop: 24 }}
        isLoading={isLoading}>
        <Text view="medium-m" color="primaryInverted">
          {button}
        </Text>
      </Button>
    </>
  );
};
