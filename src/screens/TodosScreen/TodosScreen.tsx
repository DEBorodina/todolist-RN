import React, { FC, useCallback, useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';
import { getFirestoreTasks } from 'src/firestore/get-tasks';

import { Button } from '@components/atoms/Button';
import { Spinner } from '@components/atoms/Spinner';
import { Text } from '@components/atoms/Text';
import { MainLayout } from '@components/layouts/MainLayout';
import { useModal } from '@components/molecules/Modal';
import { Task, deleteTask, updateTask } from '@firestore';
import {
  selectCategories,
  selectSetCategories,
  selectUserId,
  useStore,
} from '@store';

import { AddTaskForm } from './components/AddTaskForm';
import { TaskCard } from './components/TaskCard';
import { TodosScreenProps } from './types';

export const TodosScreen: FC<TodosScreenProps> = () => {
  const title = 'All Tasks';
  const { setIsOpen, setModalContent } = useModal();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openedTaskId, setOpenedTaskId] = useState<string>();

  const categories = useStore(selectCategories);
  const setCategories = useStore(selectSetCategories);

  const userId = useStore(selectUserId);

  const handleAdd = () => {
    setIsOpen(true);
    setModalContent(
      <AddTaskForm setTasks={setTasks} setOpenedTaskId={setOpenedTaskId} />,
    );
  };

  const handleDone = (taskId: string) => (isDone: boolean) => {
    const newTasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, isDone: isDone };
      }
      return task;
    });

    updateTask(newTasks.find(({ id }) => id === taskId)!!);
    setTasks(newTasks);
  };

  const handleDoneSubtask = (subtaskId: string) => (isDone: boolean) => {
    const newTasks = tasks.map(task => {
      if (task.id === openedTaskId) {
        const subtasks = task.subtasks?.map(subtask => {
          if (subtask.id === subtaskId) {
            return { ...subtask, isDone: isDone };
          }
          return subtask;
        });
        if (subtasks?.every(subtask => subtask.isDone)) {
          task.isDone = true;
        }
        return { ...task, subtasks };
      }
      return task;
    });

    updateTask(newTasks.find(({ id }) => id === openedTaskId)!!);
    setTasks(newTasks);
  };

  const handleDelete = useCallback(
    (taskId: string, categoryId: string) => () => {
      const newTasks = tasks.filter(task => task.id !== taskId);
      const currentCategory = categories.find(({ id }) => id === categoryId)!!;

      currentCategory.tasksAmount -= 1;
      setCategories([...categories]);

      setTasks(newTasks);
      setOpenedTaskId(newTasks[0]?.id);
      deleteTask(taskId);
    },
    [categories, setCategories, tasks],
  );

  useEffect(() => {
    const getTasks = async () => {
      const newTasks = await getFirestoreTasks(userId);
      setOpenedTaskId(newTasks[0]?.id);
      setTasks(newTasks);

      setIsLoading(false);
    };

    getTasks();
  }, [userId]);

  return (
    <MainLayout isFullLayout>
      {isLoading ? (
        <Spinner size="l" />
      ) : (
        <>
          <Text view="medium-l" color="primaryInverted" styler={{ margin: 12 }}>
            {title}
          </Text>
          <View style={{ width: '100%', marginTop: 20, flex: 1 }}>
            <FlatList
              data={tasks}
              renderItem={({ item }) => (
                <TaskCard
                  {...item}
                  isOpen={item.id === openedTaskId}
                  onDelete={handleDelete(item.id, item.categoryId)}
                  onDone={handleDone(item.id)}
                  onSubtaskDone={handleDoneSubtask}
                />
              )}
            />
          </View>
          <Button size="circle-l" color="secondary" onClick={handleAdd}>
            <Icon name="plus-a" size={19} color="#fff" />
          </Button>
        </>
      )}
    </MainLayout>
  );
};
