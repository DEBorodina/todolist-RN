import { Task } from '@firestore';

export type AddTaskFormProps = {
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  setOpenedTaskId: React.Dispatch<React.SetStateAction<string | undefined>>;
  defaultValues?: FromState;
};

export type FromState = Pick<
  Task,
  'title' | 'description' | 'subtasks' | 'isImportant'
> & {
  category: string;
  id?: string;
};
