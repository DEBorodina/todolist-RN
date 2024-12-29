import React from 'react';
import 'react-native';

import { render } from '@test-utils';

import { Spinner } from './Spinner';

describe('Spinner', () => {
  it('renders correctly', () => {
    const { queryByTestId } = render(<Spinner />);

    const container = queryByTestId('progressbar');
    const spinner = queryByTestId('spinner');

    expect(container).not.toBeNull();
    expect(spinner).not.toBeNull();
  });
});
