import { render } from '@testing-library/react-native';
import React from 'react';

import { TemplateName } from './TemplateName';

describe('Button', () => {
  it('renders correctly', () => {
    const component = render(<TemplateName />);
    expect(component).toMatchSnapshot();
  });
});
