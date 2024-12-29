import type { Meta } from '@storybook/react';
import React from 'react';

import { Input } from './Input';
import { InputProps } from './types';

const meta = {
  title: 'Input',
  component: Input,
  argTypes: {
    size: {
      options: ['m', 'l'],
      control: { type: 'radio' },
    },
    withSearchIcon: {
      options: ['true', 'false'],
      mapping: { true: true, false: false },
      control: { type: 'radio' },
    },
    placeholder: { control: { type: 'text' } },
  },
} as Meta<typeof Input>;

export default meta;

export const Default = {
  args: {
    size: 'l',
    placeholder: 'Placeholder',
  },
  render: ({ placeholder, withSearchIcon, size }: InputProps) => (
    <Input
      placeholder={placeholder}
      withSearchIcon={withSearchIcon}
      size={size}
    />
  ),
};
