import { configure } from '@testing-library/react-native';
import '@testing-library/react-native/extend-expect';

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

configure({ concurrentRoot: true });
