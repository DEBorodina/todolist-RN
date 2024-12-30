import type { Meta } from '@storybook/react';
import React from 'react';

import { Text } from '../../atoms/Text';

import { Select } from './Select';
import { SelectProps } from './types';

const meta = {
  title: 'Select',
  component: Select,
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
  withShadow: {
    option: ['true', 'false'],
    mapping: { true: true, false: false },
    control: { type: 'radio' },
  },
} as Meta<typeof Select>;

export default meta;

export const Default = {
  args: {
    size: 'l',
    placeholder: 'Placeholder',
  },
  render: ({ placeholder, withSearchIcon, size }: SelectProps) => (
    <Select
      placeholder={placeholder}
      withSearchIcon={withSearchIcon}
      size={size}
      items={['Item 1', 'Item 2', 'Item 3']}
      renderItem={item => <Text>{item}</Text>}
    />
  ),
};
