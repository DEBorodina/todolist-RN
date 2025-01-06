import React, { FC, useCallback, useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';

import { Button } from '@components/atoms/Button';
import { Spinner } from '@components/atoms/Spinner';
import { Text } from '@components/atoms/Text';
import { MainLayout } from '@components/layouts/MainLayout';
import { useModal } from '@components/molecules/Modal';
import { getFirestoreTasks } from '@firestore';
import { Task, deleteTask, updateFirestoreTask } from '@firestore';
import {
  selectCategories,
  selectSetCategories,
  selectUserId,
  useStore,
} from '@store';

import { AddTaskForm } from './components/AddTaskForm';
import { DoneTasksBlock } from './components/DoneTasksBlock';
import { TaskCard } from './components/TaskCard';
import {
  filterTasks,
  getTitle,
  updateSubtaskDoneStatus,
  updateTaskDoneStatus,
} from './helpers';
import { TasksContainer } from './styles';
import { TodosScreenProps } from './types';

export const TodosScreen: FC<TodosScreenProps> = ({ route }) => {
  const { setIsOpen, setModalContent } = useModal();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openedTaskId, setOpenedTaskId] = useState<string>();
  const [displayedTasks, setDisplayedTasks] = useState<Task[]>([]);
  const [isDoneTasks, setIsDoneTasks] = useState(false);

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
    const newTasks = updateTaskDoneStatus(tasks, taskId, isDone);

    updateFirestoreTask(newTasks.find(({ id }) => id === taskId)!!);
    setTasks(newTasks);
  };

  const handleOpenTask = (taskId: string) => () => setOpenedTaskId(taskId);

  const handleDoneSubtask = (subtaskId: string) => (isDone: boolean) => {
    const newTasks = updateSubtaskDoneStatus(
      tasks,
      openedTaskId,
      subtaskId,
      isDone,
    );

    updateFirestoreTask(newTasks.find(({ id }) => id === openedTaskId)!!);
    setTasks(newTasks);
  };

  const handleEditTask = (task: Task) => () => {
    setIsOpen(true);

    const category = categories.find(({ id }) => id === task.categoryId)
      ?.name!!;

    setModalContent(
      <AddTaskForm
        setTasks={setTasks}
        setOpenedTaskId={setOpenedTaskId}
        defaultValues={{ category, ...task }}
      />,
    );
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
    if (route.params.filter === 'done') {
      setDisplayedTasks(tasks);
      return;
    }
    setDisplayedTasks(tasks.filter(({ isDone }) => isDone === isDoneTasks));
  }, [isDoneTasks, route.params.filter, tasks]);

  useEffect(() => {
    const getTasks = async () => {
      const newTasks = filterTasks(
        await getFirestoreTasks(userId),
        route.params,
      );
      setOpenedTaskId(newTasks[0]?.id);
      setTasks(newTasks);

      setIsLoading(false);
    };

    getTasks();
  }, [route.params, userId]);

  const doneTasksAmount = tasks.filter(task => task.isDone).length;

  const title = getTitle(route.params, categories);

  return (
    <MainLayout isFullLayout>
      {isLoading ? (
        <Spinner size="l" />
      ) : (
        <>
          <Text view="medium-l" color="primaryInverted" styler={{ margin: 12 }}>
            {title}
          </Text>
          <TasksContainer>
            <FlatList
              data={displayedTasks}
              renderItem={({ item }) => (
                <TaskCard
                  {...item}
                  isOpen={item.id === openedTaskId}
                  onDelete={handleDelete(item.id, item.categoryId)}
                  onDone={handleDone(item.id)}
                  onSubtaskDone={handleDoneSubtask}
                  onTaskPress={handleOpenTask(item.id)}
                  onEdit={handleEditTask(item)}
                  key={item.id}
                />
              )}
            />
          </TasksContainer>
          {route.params.filter !== 'done' && (
            <>
              <DoneTasksBlock
                tasksAmount={doneTasksAmount}
                isOpen={isDoneTasks}
                onPress={() => setIsDoneTasks(!isDoneTasks)}
              />
              <Button size="circle-l" color="secondary" onClick={handleAdd}>
                <Icon name="plus-a" size={19} color="#fff" testID="add" />
              </Button>
            </>
          )}
        </>
      )}
    </MainLayout>
  );
};
