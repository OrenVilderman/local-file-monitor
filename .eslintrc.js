module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'no-console': 'off',
    'class-methods-use-this': 'off',
    'max-len': 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'no-shadow': 'off',
    'no-unused-expressions': 'off',
    'no-promise-executor-return': 'off',
  },
};
