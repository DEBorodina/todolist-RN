export type StyledTaskGroupCardProps = {
  color: string;
};

export type TaskGroupCardProps = StyledTaskGroupCardProps & {
  iconName: string;
  name: string;
  tasksAmount: number;
};
