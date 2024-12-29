import { DARK, LIGHT } from './constants';

export const colors = {
  [LIGHT]: {
    primary: '#9BA3EB',
    secondary: '#646FD4',
    primaryInverted: '#FFFFFF',
    pink: '#D25EB0',
    lightGray: '#E7E7E7',
    text: {
      primary: '#363636',
      secondary: '#8D93AB',
      primaryInverted: '#FFFFFF',
      gray: '#888888',
    },
  },
  // TODO: Add dark theme
  [DARK]: {
    primary: '#9BA3EB',
    secondary: '#646FD4',
    primaryInverted: '#FFFFFF',
    pink: '#d25EEB0',
    lightGray: '#E7E7E7',
    text: {
      primary: '#363636',
      secondary: '#8D93AB',
      primaryInverted: '#FFFFFF',
      gray: '#888888',
    },
  },
};
