import { ReactNode } from 'react';

export type ModalPortalProps = {};

export type ChildrenProps = { children: ReactNode };

export type ModalProviderProps = ChildrenProps;
export type ModalProps = ChildrenProps;

export type ModalContextType = {
  modalContent?: ReactNode;
  setModalContent: React.Dispatch<React.SetStateAction<ReactNode>>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
