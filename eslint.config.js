import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import pluginN from 'eslint-plugin-n';
import perfectionist from 'eslint-plugin-perfectionist';
import pluginSecurityNode from 'eslint-plugin-security-node';
import pluginUnicorn from 'eslint-plugin-unicorn';
import globals from 'globals';

export default [
  // Global configuration for the entire project
  {
    ignores: ['**/node_modules/*', '**/dist/*', '**/output/*', '**/.husky/*', '**/coverage/*', '**/tests/*'],
  },
  {
    languageOptions: {
      ecmaVersion: 'latest',
      globals: {
        ...globals.node,
      },
      sourceType: 'module',
    },
  },

  // Core code quality
  {
    plugins: {
      n: pluginN,
      unicorn: pluginUnicorn,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...pluginN.configs['flat/recommended'].rules,
      ...pluginUnicorn.configs.recommended.rules,
      // Enforce strict equality checks (=== and !==)
      'eqeqeq': ['error', 'always'],
      'n/no-unpublished-import': 'off',
    },
  },

  // Code formatting and style
  {
    plugins: {
      '@stylistic': stylistic,
    },
    rules: {
      ...stylistic.configs.recommended.rules,
      '@stylistic/arrow-parens': ['error', 'always'],
      '@stylistic/comma-dangle': ['error', 'always-multiline'],
      '@stylistic/indent': ['error', 2],
      '@stylistic/max-len': ['error', { code: 120, ignoreUrls: true }],
      '@stylistic/quotes': ['error', 'single', { avoidEscape: true }],
      '@stylistic/semi': ['error', 'always'],
    },
  },

  // Sorting (imports, exports, objects, arrays, ...)
  {
    plugins: {
      perfectionist,
    },
    rules: {
      ...perfectionist.configs['recommended-natural'].rules,
      'perfectionist/sort-imports': [
        'error',
        {
          groups: [
            'type',
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'unknown',
          ],
          ignoreCase: true,
          internalPattern: ['^~/.+', '^@/.+'],
          newlinesBetween: 'always',
          order: 'asc',
          type: 'alphabetical',
        },
      ],
    },
  },

  // Security
  {
    plugins: {
      'security-node': pluginSecurityNode,
    },
    rules: {
      ...pluginSecurityNode.configs.recommended.rules,
    },
  },
];
