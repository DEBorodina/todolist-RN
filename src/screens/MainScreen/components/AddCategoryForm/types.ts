import { Category } from '@firestore';

export type FromState = {
  name: string;
  iconName: string;
};

export type AddCategoryFormProps = {
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
};
