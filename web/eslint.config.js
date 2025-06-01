import js from '@eslint/js';

export default [
  {
    ignores: [
      'node_modules/',
      'dist/',
      'build/',
      '.yarn/',
      '.pnp.*',
      '*.log',
      '.env*',
      'coverage/',
      'cypress/downloads/',
      'cypress/screenshots/',
      'cypress/videos/',
    ],
  },
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        cy: 'readonly',
        Cypress: 'readonly',
      },
    },
  },
  {
    files: ['cypress/**/*.js'],
    rules: {
      'no-console': 'off',
      'no-unused-expressions': 'off',
      'no-undef': 'off',
    },
  },
];
