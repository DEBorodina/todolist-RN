import { configure } from '@testing-library/react-native';
import '@testing-library/react-native/extend-expect';

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

configure({ concurrentRoot: true });
