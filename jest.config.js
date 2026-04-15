module.exports = {
  moduleFileExtensions: ['js', 'json', 'vue'],
  transform: {
    // Process .vue files with vue-jest
    '^.+\\.vue$': 'vue-jest',
    // Process .js files with babel-jest
    '^.+\\.js$': 'babel-jest',
  },
  // Map '@' to your 'src' directory
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/tests/unit/fileMock.js',
  },
  testEnvironment: 'jsdom',
};
