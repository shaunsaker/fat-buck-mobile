import 'react-native-gesture-handler/jestSetup';

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};

  return Reanimated;
});

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

export const MOCKED_MOMENT_ISO_STRING = '2018-08-26T19:17:02.349Z';

jest.mock('../src/utils/getDate', () => ({
  getDate: () => MOCKED_MOMENT_ISO_STRING,
}));
