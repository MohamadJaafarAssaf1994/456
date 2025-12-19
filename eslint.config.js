// eslint.config.js — FINAL SAFE VERSION

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import angular from 'angular-eslint';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import storybook from 'eslint-plugin-storybook';

export default tseslint.config(
  /* =========================
     TypeScript files
     ========================= */
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...angular.configs.tsRecommended,
      prettierConfig,
    ],
    processor: angular.processInlineTemplates,
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      /* Angular selectors */
      '@angular-eslint/component-selector': [
        'error',
        { type: 'element', prefix: 'app', style: 'kebab-case' },
      ],
      '@angular-eslint/directive-selector': [
        'error',
        { type: 'attribute', prefix: 'app', style: 'camelCase' },
      ],

      /* Relaxed rules (intentional) */
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@angular-eslint/prefer-inject': 'off',

      'prettier/prettier': 'error',
    },
  },

  /* =========================
     HTML templates
     ========================= */
  {
    files: ['**/*.html'],
    extends: [
      ...angular.configs.templateRecommended,
      prettierConfig,
    ],
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'error',
      '@angular-eslint/template/label-has-associated-control': 'off',
      '@angular-eslint/template/no-negated-async': 'off',
    },
  },

  /* =========================
     Tests
     ========================= */
  {
    files: ['**/*.spec.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },

  /* =========================
   STORYBOOK FILES
   ========================= */
{
  files: ['src/stories/**/*.ts', '**/*.stories.ts'],
  rules: {
    '@angular-eslint/component-selector': 'off',
    '@angular-eslint/no-output-on-prefix': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
  },
},


  /* =========================
     Mocks & dev
     ========================= */
  {
    files: ['src/mocks/**/*.ts', 'src/dev/**/*.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  }
);
