import { SCREENS } from '@navigation';

export type UseNavigation = {
  navigate: (screen: keyof typeof SCREENS, params: Params) => void;
};

export type Params = {
  filter: 'all' | 'category' | 'important' | 'done' | 'search';
  categoryId?: string;
  search?: string;
};
