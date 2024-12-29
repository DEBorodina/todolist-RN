import { DAY_NAMES, MONTH_NAMES } from '@constants';
import { Category } from '@firestore';

export const getTasksAmount = (categories: Category[]) =>
  categories?.reduce((total, { tasksAmount }) => total + tasksAmount, 0);

export const formatDate = () => {
  const today = new Date();
  const day = today.getDay();
  const month = today.getMonth();
  const year = today.getFullYear();
  const date = today.getDate();
  return `${DAY_NAMES[day]},${MONTH_NAMES[month]} ${date},${year}`;
};
