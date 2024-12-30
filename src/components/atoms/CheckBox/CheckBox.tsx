import React, { FC } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from 'styled-components/native';

import { StyledCheckBox } from './styles';
import { CheckBoxProps } from './types';

export const CheckBox: FC<CheckBoxProps> = ({
  isChecked,
  onChange,
  styler,
}) => {
  const {
    colors: { secondary },
  } = useTheme();
  return (
    <StyledCheckBox onPress={() => onChange(!isChecked)} styler={styler}>
      {isChecked && <Icon name="checkmark" size={20} color={secondary} />}
    </StyledCheckBox>
  );
};
