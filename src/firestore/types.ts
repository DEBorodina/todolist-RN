export type Category = {
  color: string;
  iconName: string;
  name: string;
  userId: string;
  id: string;
  tasksAmount: number;
};
export type BaseCategory = Omit<Category, 'id'>;

export type WhereFilterOp = '<' | '<=' | '==' | '>=' | '>' | 'array-contains';
export type WhereProps = [string, WhereFilterOp, string];

export type Task = {
  title: string;
  description: string;
  subtasks?: Subtask[];
  userId: string;
  categoryId: string;
  id: string;
  isDone: boolean;
};
export type BaseTask = Omit<Task, 'id' | 'subtasks'>;

export type Subtask = {
  id: string;
  title: string;
  isDone: boolean;
};
