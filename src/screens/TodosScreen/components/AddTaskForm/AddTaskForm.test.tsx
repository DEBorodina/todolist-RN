import React from 'react';

import { render } from '@test-utils';

import { AddTaskForm } from './AddTaskForm';

describe('AddTaskForm', () => {
  it('renders correctly', () => {
    render(<AddTaskForm />);
  });
});
