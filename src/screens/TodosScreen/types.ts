export type TodosScreenProps = {
  route: {
    params: {
      filter: 'all' | 'category' | 'important' | 'done' | 'search';
      categoryId?: string;
      search?: string;
    };
  };
};
