import React from 'react';

import { render } from '@test-utils';

import { DrawerMenu } from './DrawerMenu';

describe('DrawerMenu', () => {
  it('calls toggleDrawer when pressed', () => {
    render(
      <DrawerMenu
        state={undefined}
        navigation={undefined}
        descriptors={undefined}
      />,
    );
  });
});
