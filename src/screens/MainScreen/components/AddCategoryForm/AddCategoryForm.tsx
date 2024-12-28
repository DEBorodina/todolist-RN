import React, { useState } from 'react';
import {
  Controller,
  FormProvider,
  useForm,
  useFormState,
  useWatch,
} from 'react-hook-form';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { Button } from '@components/atoms/Button';
import { Input } from '@components/atoms/Input';
import { ControlledInput } from '@components/atoms/Input/ControlledInput';
import { Select } from '@components/atoms/Select';
import { Text } from '@components/atoms/Text';
import { ICONS } from '@constants';

export const AddCategoryForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [icons, setIcons] = useState([]);

  const handleIconChange = onChange => value => {
    onChange(value);
    const ic = ICONS.filter(icon => icon.includes(value.toLowerCase())).slice(
      0,
      3,
    );
    console.log('ic', ic);
    setIcons(ic);
  };

  const onSubmit = data => console.log(data);

  return (
    <View
      style={{
        width: 240,
      }}>
      <Text styler={{ marginBottom: 24 }} view="medium-l">
        Add category
      </Text>
      <Controller
        control={control}
        render={({ field: { onBlur, onChange, value } }) => (
          <>
            <Input
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Category"
            />
            <Text view="light-s" textAlign="left" styler={{ marginLeft: 8 }}>
              {String(errors.categoryName?.message ?? '')}
            </Text>
          </>
        )}
        name="categoryName"
        rules={{ required: 'required' }}
      />
      <Controller
        control={control}
        render={({ field: { onBlur, onChange, value } }) => (
          <>
            <Select
              placeholder="Icon"
              onBlur={onBlur}
              onChangeText={handleIconChange(onChange)}
              value={value}
              styler={{ marginTop: 12 }}
              items={icons}
              renderItem={item => (
                <>
                  <Text>{item}</Text>
                  <Icon name={item} />
                </>
              )}
            />
            <Text view="light-s" textAlign="left" styler={{ marginLeft: 8 }}>
              {String(errors.categoryIcon?.message ?? '')}
            </Text>
          </>
        )}
        name="categoryIcon"
        rules={{ required: 'required' }}
      />
      <Button onClick={handleSubmit(onSubmit)} styler={{ marginTop: 12 }}>
        <Text view="medium-m" color="primaryInverted">
          add
        </Text>
      </Button>
    </View>
  );
};
