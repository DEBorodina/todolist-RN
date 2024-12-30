import { DrawerScreenProps } from '@react-navigation/drawer';

import { RootDrawerParamList } from '@navigation';

export type TodosScreenProps = DrawerScreenProps<
  RootDrawerParamList,
  'TODOS_SCREEN'
>;
