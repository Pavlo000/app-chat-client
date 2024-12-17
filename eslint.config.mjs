import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';

/** @type {import('eslint').Linter.Config[]} */
const config = [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  pluginReact.configs.flat['jsx-runtime'],
  {
    files: [
      'src/**/**/*.{js,mjs,cjs,ts,jsx,tsx}',
      'src/**/*.{js,mjs,cjs,ts,jsx,tsx}',
      'src/*.{js,mjs,cjs,ts,jsx,tsx}',
    ],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        process: 'readonly',
        console: 'readonly',
      }
    },
    plugins: {
      react: pluginReact,
    },
    rules: {
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      'react/prop-types': 'off',
    },
  },
];

export default config;
