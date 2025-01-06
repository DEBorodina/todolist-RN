module.exports = {
  preset: '@testing-library/react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  setupFilesAfterEnv: ['./jest-setup.ts'],
  modulePathIgnorePatterns: ['templates', 'e2e'],
  collectCoverage: true,
  collectCoverageFrom: ['./src/**/*.{ts,tsx}'],
  coveragePathIgnorePatterns: [
    '<rootDir>/.*.stories.?(ts|tsx|js|jsx)',
    '<rootDir>/.*.index.?(ts|tsx|js|jsx)',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(@react-native|react-native|react-native-reanimated|react-redux|react-native-vector-icons|@react-native-firebase|@react-navigation)/)',
  ],
};
