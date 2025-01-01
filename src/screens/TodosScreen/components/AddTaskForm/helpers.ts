import uuid from 'react-native-uuid';

import { Category, Subtask } from '@firestore';

export const filterCategories = (
  categories: Category[],
  value: string,
  amount = 5,
) =>
  categories
    .filter(({ name }) =>
      name.toLocaleLowerCase().includes(value.toLowerCase()),
    )
    .slice(0, amount);

export const updateSubtasks =
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

const categoriesError = 'Must be from the list';
export const validateCategories =
  (categories: Category[], error = categoriesError) =>
  (value: string) =>
    categories.find(({ name }) =>
      name.toLocaleLowerCase().includes(value.toLowerCase()),
    )
      ? true
      : error;
