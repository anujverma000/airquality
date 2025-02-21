
module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: [
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:perfectionist/recommended-natural',
    'plugin:@tanstack/eslint-plugin-query/recommended',
  ],
  globals: {
    CustomEvent: true,
    chrome: true,
    fetch: true,
    localStorage: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'react-refresh', 'perfectionist'],
  rules: {
    '@next/next/no-page-custom-font': 'off',
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/ban-ts-comment': 0,
    'comma-dangle': 0,
    'import/no-anonymous-default-export': 0,
    'multiline-ternary': 0,
    'n/no-callback-literal': 0,
    'no-tabs': ['error', { allowIndentationTabs: true }],
    'no-undef': 'error',
    'perfectionist/sort-imports': [
      'error',
      {
        'custom-groups': {
          type: {
            react: 'react',
          },
          value: {
            nanostores: '@nanostores/**',
            react: ['react', 'react-*'],
          },
        },
        groups: [
          'type',
          'react',
          ['builtin', 'external', 'external-type'],
          'nanostores',
          'internal-type',
          'internal',
          ['parent-type', 'sibling-type', 'index-type'],
          ['parent', 'sibling', 'index'],
          'side-effect',
          'style',
          'object',
          'unknown',
        ],
        'internal-pattern': ['@/**', '@/hooks/**'],
        order: 'asc',
        type: 'natural',
      },
    ],
    'perfectionist/sort-objects': 'off',
    'perfectionist/sort-enums': 'off',
    'prettier/prettier': [
      0,
      {
        trailingComma: 'none',
      },
    ],
    'react/no-unknown-property': 0,
    'react/prop-types': 0,
    'react/react-in-jsx-scope': 0,
    'react-hooks/exhaustive-deps': 'off',
    'react-refresh/only-export-components': 'off',
    'space-before-function-paren': 0,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
