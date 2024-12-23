export type StyledTaskGroupCardProps = {
  color: string;
};

export type TaskGroupCardProps = StyledTaskGroupCardProps & {
  iconName: string;
  category: string;
  tasksAmount: number;
};
