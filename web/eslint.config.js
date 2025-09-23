import js from '@eslint/js';

export default [
  {
    languageOptions: {
      sourceType: 'module',
    },
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
    files: ['cypress.config.js', 'eslint.config.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'script',
      globals: {
        module: 'readonly',
        require: 'readonly',
        process: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
      },
    },
  },
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