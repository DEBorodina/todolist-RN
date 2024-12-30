import { Subtask, Task } from '@firestore';

export type AddTaskFormProps = {
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  setOpenedTaskId: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export type FromState = {
  title: string;
  description: string;
  subtasks: Subtask[];
  category: string;
};
