import { createContext } from 'react';

import { ModalContextType } from './types';

export const initialValue = {
  setModalContent: () => {},
  isOpen: false,
  setIsOpen: () => {},
};

export const ModalContext = createContext<ModalContextType>(initialValue);
