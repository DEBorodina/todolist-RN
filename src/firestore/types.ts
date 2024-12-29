export type Category = {
  color: string;
  iconName: string;
  name: string;
  userId: string;
  id: string;
  tasksAmount: number;
};
export type BaseCategory = Omit<Category, 'id' | 'tasksAmount'>;

export type WhereFilterOp = '<' | '<=' | '==' | '>=' | '>' | 'array-contains';
export type WhereProps = [string, WhereFilterOp, string];
