module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
  },
  rules: {
    semi: ['error', 'always'],
    quotes: ['error', 'single'],
    'arrow-parens': ['error', 'as-needed'],
    'max-len': ['error', { code: 80, ignoreComments: true }],
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
  },
};
