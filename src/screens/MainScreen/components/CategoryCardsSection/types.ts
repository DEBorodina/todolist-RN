import { Category } from '@firestore';

export type CategoryCardsSectionProps = {
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
};
