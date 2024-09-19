import { render } from '@testing-library/react-native';
import React from 'react';

import { Button } from './Button';

describe('Button', () => {
  it('renders correctly', () => {
    const component = render(<Button />);
    expect(component).toMatchSnapshot();
  });
});
