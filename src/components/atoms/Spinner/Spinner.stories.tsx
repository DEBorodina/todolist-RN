import type { Meta } from '@storybook/react';

import { Spinner } from './Spinner';

const meta: Meta<typeof Spinner> = {
  title: 'Spinner',
  component: Spinner,
  argTypes: {
    color: {
      options: ['primary', 'secondary', 'primaryInverted'],
      control: { type: 'radio' },
    },
    size: {
      options: ['m', 'l'],
      control: { type: 'radio' },
    },
  },
};

export default meta;

export const Default = {
  args: {
    size: 'm',
    color: 'primary',
  },
};
