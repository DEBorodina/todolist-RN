import { Task } from '@firestore';

export type TaskCardProps = Task & {
  isOpen?: boolean;
  onDelete: () => void;
  onDone: (isDone: boolean) => void;
  onSubtaskDone: (subtaskId: string) => (isDone: boolean) => void;
  onTaskPress: () => void;
  onEdit: () => void;
};
