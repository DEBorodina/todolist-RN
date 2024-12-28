import React, { useContext } from 'react';
import { TouchableOpacity } from 'react-native';
import { FadeInDown } from 'react-native-reanimated';

import { ModalContext } from './context';
import { StyledModal, StyledModalBackground } from './styles';
import { ModalProps } from './types';

export const Modal = ({ children }: ModalProps) => {
  const { setIsOpen } = useContext(ModalContext);

  const handlePress = () => {
    setIsOpen(prevState => !prevState);
  };

  return (
    <StyledModalBackground onPress={handlePress} activeOpacity={1}>
      <TouchableOpacity onPress={() => {}} activeOpacity={1}>
        <StyledModal entering={FadeInDown.duration(300)}>
          {children}
        </StyledModal>
      </TouchableOpacity>
    </StyledModalBackground>
  );
};
