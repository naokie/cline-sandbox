// eslint.config.mjs
import js from '@eslint/js';
import nextPlugin from '@next/eslint-plugin-next';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';

// 共通の基本設定
const baseConfig = {
  files: ['**/*.{js,mjs,cjs,jsx,ts,tsx}'],
  languageOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: {
    import: importPlugin,
  },
  rules: {
    ...js.configs.recommended.rules,
    'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
    'no-unused-vars': 'off', // TypeScriptのルールで代替
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'object',
          'type',
        ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
};

// TypeScript用の設定
const typescriptConfig = {
  files: ['**/*.{ts,tsx}'],
  languageOptions: {
    parser: tsParser,
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      project: [
        './packages/*/tsconfig.json',
      ],
    },
  },
  plugins: {
    '@typescript-eslint': tseslint,
  },
  rules: {
    ...tseslint.configs.recommended.rules,
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
  },
};

// React用の設定
const reactConfig = {
  files: ['**/*.{jsx,tsx}'],
  languageOptions: {
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
  plugins: {
    'react': reactPlugin,
    'react-hooks': reactHooksPlugin,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    ...reactPlugin.configs.recommended.rules,
    ...reactHooksPlugin.configs.recommended.rules,
    'react/react-in-jsx-scope': 'off', // React 17以降では不要
    'react/prop-types': 'off', // TypeScriptを使用する場合は不要
    'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
  },
};

// Next.js用の設定
const nextConfig = {
  files: ['packages/frontend/**/*.{js,mjs,jsx,ts,tsx}'],
  plugins: {
    '@next/next': nextPlugin,
  },
  rules: {
    ...nextPlugin.configs.recommended.rules,
    ...nextPlugin.configs['core-web-vitals'].rules,
    // App Routerを使用している場合、pagesディレクトリのチェックを無効化
    '@next/next/no-html-link-for-pages': 'off',
  },
  settings: {
    // App Routerを使用している場合の設定
    next: {
      rootDir: 'packages/frontend',
    },
  },
};

// バックエンド用の設定
const backendConfig = {
  files: ['packages/backend/**/*.{js,mjs,ts}'],
  rules: {
    // バックエンド特有のルール
    'no-process-exit': 'error',
  },
};

// テスト用の設定
const testConfig = {
  files: ['**/*.test.{js,mjs,ts,jsx,tsx}', '**/*.spec.{js,mjs,ts,jsx,tsx}', '**/tests/**/*.{js,mjs,ts,jsx,tsx}'],
  rules: {
    'no-console': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
};

// 設定をエクスポート
export default [
  baseConfig,
  typescriptConfig,
  reactConfig,
  nextConfig,
  backendConfig,
  testConfig,
];
