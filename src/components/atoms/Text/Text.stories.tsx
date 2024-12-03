import type { Meta } from '@storybook/react';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Text } from './Text';
import { FONT_SIZES, FONT_WEIGHTS, fontPresetsNames } from './constants';
import { FontSizes, FontWeights } from './types';

const colors = ['primary', 'secondary', 'primaryInverted'];

const meta: Meta<typeof Text> = {
  title: 'Text',
  component: Text,
  argTypes: {
    color: {
      options: colors,
      control: { type: 'radio' },
    },
    view: {
      options: fontPresetsNames,
      control: { type: 'radio' },
    },
  },
};

export default meta;

export const Default = {
  args: {
    children: 'Hello world',
  },
};

export const Presets = {
  render: () => (
    <View style={styles.story}>
      {fontPresetsNames.map(view => {
        const [weight, size] = view.split('-');
        const { fontSize } = FONT_SIZES[size as FontSizes];
        const { fontWeight } = FONT_WEIGHTS[weight as FontWeights];

        return (
          <View key={view} style={styles.textView}>
            <Text view={view}>{`${view}`}</Text>
            <Text view={view}>{`${fontSize}px | ${fontWeight}`}</Text>
          </View>
        );
      })}
    </View>
  ),
};

const styles = StyleSheet.create({
  story: { width: '80%' },
  textView: { flexDirection: 'row', justifyContent: 'space-between' },
});
