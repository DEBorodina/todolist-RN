import { Category } from '@firestore';

export type StyledTaskGroupCardProps = Pick<Category, 'color'>;

export type TaskGroupCardProps = Category;
