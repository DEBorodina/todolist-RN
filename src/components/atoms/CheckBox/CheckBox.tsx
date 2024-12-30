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

  const handlePress = () => onChange(!isChecked);

  return (
    <StyledCheckBox onPress={handlePress} styler={styler} testID="checkbox">
      {isChecked && (
        <Icon
          name="checkmark"
          size={20}
          color={secondary}
          testID="check-mark"
        />
      )}
    </StyledCheckBox>
  );
};
