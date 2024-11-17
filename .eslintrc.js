module.exports = {
  extends: [
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier'
  ],
  plugins: ['@typescript-eslint', 'react-hooks', 'simple-import-sort'],
  parser: '@typescript-eslint/parser',
  rules: {
    // TypeScript specific rules
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': ['error', { 
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_'
    }],

    // React specific rules
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/no-unescaped-entities': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',

    // Import sorting
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',

    // General best practices
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-unused-expressions': 'error',
    'prefer-const': 'error',

    // Performance and security
    'react/jsx-no-target-blank': 'error',
    
    // Accessibility
    'jsx-a11y/alt-text': 'warn',
    'jsx-a11y/aria-role': 'warn',

    // Complexity management
    'max-lines-per-function': ['warn', {
      max: 100,
      skipBlankLines: true,
      skipComments: true
    }],
    'complexity': ['warn', 10]
  },
  settings: {
    react: {
      version: 'detect'
    },
    'import/resolver': {
      typescript: {}
    }
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': ['error', {
          allowExpressions: true
        }]
      }
    }
  ]
}
