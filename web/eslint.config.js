import js from '@eslint/js';
import cypress from 'eslint-plugin-cypress';

export default [
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      '.yarn/**',
      // adicione outros diretórios gerados se necessário
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
    plugins: { cypress },
    ...cypress.configs.recommended,
    rules: {
      'no-console': 'off',
      'no-unused-expressions': 'off',
      // mantenha no-undef desligado só para specs se quiser
      'no-undef': 'off',
      indent: ['error', 2],
    },
  },
];
