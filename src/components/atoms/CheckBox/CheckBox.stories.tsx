import type { Meta } from '@storybook/react';

import { CheckBox } from './CheckBox';

const meta: Meta<typeof CheckBox> = {
  title: 'CheckBox',
  component: CheckBox,
  argTypes: {
    isChecked: {
      options: ['true', 'false'],
      mapping: { true: true, false: false },
      control: { type: 'radio' },
    },
    onChange: { action: 'pressed the button' },
  },
};

export default meta;

export const Default = {};
