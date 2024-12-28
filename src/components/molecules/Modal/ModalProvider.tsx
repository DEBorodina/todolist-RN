import React, { ReactNode, useMemo, useState } from 'react';

import { ModalContext } from './context';
import { ModalProviderProps } from './types';

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [modalContent, setModalContent] = useState<ReactNode>(null);
  const [isOpen, setIsOpen] = useState(false);

  const modal = useMemo(
    () => ({ modalContent, setModalContent, isOpen, setIsOpen }),
    [isOpen, modalContent],
  );

  return (
    <ModalContext.Provider value={modal}>{children}</ModalContext.Provider>
  );
};
