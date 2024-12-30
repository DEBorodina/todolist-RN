import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Icon from 'react-native-vector-icons/Ionicons';

import { Button } from '@components/atoms/Button';
import { Input } from '@components/atoms/Input';
import { Text } from '@components/atoms/Text';
import { useModal } from '@components/molecules/Modal';
import { Select } from '@components/molecules/Select';
import { ICONS } from '@constants';
import { addFirestoreCategory } from '@firestore';
import { selectUserId, useStore } from '@store';
import { getRandomColor } from '@utils';

import { Container } from './styles';
import { FromState } from './types';

export const AddCategoryForm = () => {
  const { control, handleSubmit } = useForm<FromState>();
  const [isLoading, setIsLoading] = useState(false);
  const addCategory = useStore(state => state.addCategory);

  const userId = useStore(selectUserId);
  const { setIsOpen } = useModal();

  const [icons, setIcons] = useState<string[]>([]);
  const handleIconChange =
    (onChange: (value: string) => void) => (value: string) => {
      onChange(value);

      const newIcons = ICONS.filter(icon =>
        icon.includes(value.toLowerCase()),
      ).slice(0, 3);
      setIcons(newIcons);
    };

  const onSubmit = async (data: FromState) => {
    setIsLoading(true);
    const newCategory = {
      ...data,
      color: getRandomColor(),
      userId: userId ?? '',
      tasksAmount: 0,
    };
    const newCategoryId = await addFirestoreCategory(newCategory);

    addCategory({
      ...newCategory,
      id: newCategoryId,
    });

    setIsOpen(false);
    setIsLoading(false);
  };

  return (
    <Container>
      <Text styler={{ marginBottom: 24 }} view="medium-l">
        Add category
      </Text>
      <Controller
        control={control}
        render={({
          field: { onBlur, onChange, value },
          fieldState: { error },
        }) => (
          <>
            <Input
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Category"
            />
            <Text view="light-s" textAlign="left" styler={{ marginLeft: 8 }}>
              {String(error?.message ?? '')}
            </Text>
          </>
        )}
        name="name"
        rules={{ required: 'required' }}
      />
      <Controller
        control={control}
        render={({
          field: { onBlur, onChange, value },
          fieldState: { error },
        }) => (
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
              {String(error?.message ?? '')}
            </Text>
          </>
        )}
        name="iconName"
        rules={{ required: 'required' }}
      />
      <Button
        onClick={handleSubmit(onSubmit)}
        styler={{ marginTop: 12 }}
        isLoading={isLoading}>
        <Text view="medium-m" color="primaryInverted">
          add
        </Text>
      </Button>
    </Container>
  );
};
