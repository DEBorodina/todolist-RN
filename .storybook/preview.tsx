import type { Preview } from '@storybook/react';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { GlobalThemeProvider } from '../src/theme';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        date: /Date$/,
      },
    },
  },
  decorators: [
    Story => (
      <GlobalThemeProvider>
        <View style={styles.story}>
          <Story />
        </View>
      </GlobalThemeProvider>
    ),
  ],
};

const styles = StyleSheet.create({
  story: { alignItems: 'center', justifyContent: 'center', flex: 1 },
});

export default preview;
