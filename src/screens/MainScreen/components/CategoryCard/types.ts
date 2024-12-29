import { Category } from '@firestore';

export type StyledCategoryCardProps = Pick<Category, 'color'>;

export type CategoryCardProps = Category;
