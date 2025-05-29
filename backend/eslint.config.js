import js from '@eslint/js';
import globals from 'globals';

export default [
  {
    ignores: ['node_modules/**', 'dist/**', 'build/**'],
  },
  js.configs.recommended, // directly include recommended config from @eslint/js
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js },
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    rules: {
      'linebreak-style': 'off',
      'no-debugger': 'error',
    },
  },
];
