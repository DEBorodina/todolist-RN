import type { Meta } from '@storybook/react';
import React from 'react';
import Icon from 'react-native-vector-icons/Fontisto';

import { Text } from '../Text';

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
      options: ['m', 'circle-l', 'circle-m'],
      control: { type: 'radio' },
    },
    isLoading: {
      options: ['true', 'false'],
      mapping: { true: true, false: false },
      control: { type: 'radio' },
    },
    onClick: { action: 'pressed the button' },
  },
} as Meta<typeof Button>;

export default meta;

export const Default = {
  args: {
    children: <Text color="primaryInverted">Hello world</Text>,
  },
};

export const Circle = {
  args: {
    children: <Icon name="plus-a" size={19} color="#fff" />,
    color: 'secondary',
    size: 'circle',
  },
};
