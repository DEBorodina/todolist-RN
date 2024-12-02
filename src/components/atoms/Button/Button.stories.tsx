import type { Meta } from '@storybook/react';
import React from 'react';
import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';

import { Button } from './Button';

const meta = {
  title: 'Button',
  component: Button,
  argTypes: {
    color: {
      options: ['primary', 'secondary'],
      control: { type: 'radio' },
    },
    size: {
      options: ['m', 'circle'],
      control: { type: 'radio' },
    },
    onPress: { action: 'pressed the button' },
  },
} as Meta<typeof Button>;

export default meta;

export const Default = {
  args: {
    children: <Text>'Hello world'</Text>,
  },
};

export const Circle = {
  args: {
    children: (
      <Text>
        <Icon name="plus-a" size={19} color="#fff" />
      </Text>
    ),
    color: 'secondary',
    size: 'circle',
  },
};
