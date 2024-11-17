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
    // Disable strict TypeScript rules
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',  // Disable return type requirement
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'off',

    // React specific rules
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/no-unescaped-entities': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',

    // Import sorting (optional, you can turn these off too if needed)
    'simple-import-sort/imports': 'off',
    'simple-import-sort/exports': 'off',

    // Disable other strict rules
    'no-console': 'off',
    'no-unused-expressions': 'off',
    'max-lines-per-function': 'off',
    'complexity': 'off'
  }
}
