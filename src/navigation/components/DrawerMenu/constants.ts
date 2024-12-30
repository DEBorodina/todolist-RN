export const DRAWER_MENU_ITEMS = [
  {
    iconName: 'calendar-clear-outline',
    name: 'All tasks',
    params: { filter: 'all' },
  },
  {
    name: 'Important tasks',
    iconName: 'star',
    params: { filter: 'important' },
  },
  {
    iconName: 'checkmark-done',
    name: 'Done tasks',
    params: { filter: 'done' },
  },
];
