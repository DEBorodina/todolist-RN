import { ICONS } from '@constants';

export const filterIconsByName = (value: string, amount = 3) =>
  ICONS.filter(icon => icon.includes(value.toLowerCase())).slice(0, amount);
