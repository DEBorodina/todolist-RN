import React, { FC, useContext } from 'react';

import { Modal } from './Modal';
import { ModalContext } from './context';
import { StyledBlurBackground } from './styles';
import { ModalPortalProps } from './types';

export const ModalPortal: FC<ModalPortalProps> = () => {
  const { isOpen, modalContent } = useContext(ModalContext);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <StyledBlurBackground blurType="light" blurAmount={4} />
      <Modal>{modalContent}</Modal>
    </>
  );
};
