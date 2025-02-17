import { useContext } from 'react';

import { ModalContext } from './context';

export const useModal = () => useContext(ModalContext);
