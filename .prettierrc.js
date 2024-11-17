module.exports = {
  // Indentation
  tabWidth: 2,
  useTabs: false,

  // Quotes
  singleQuote: true,
  jsxSingleQuote: true,

  // Semicolons
  semi: false,

  // Trailing Commas
  trailingComma: 'es5',

  // Bracket Spacing
  bracketSpacing: true,

  // Bracket Line
  bracketSameLine: false,

  // Arrow Function Parentheses
  arrowParens: 'always',

  // Prose Wrapping
  proseWrap: 'always',

  // HTML Whitespace Sensitivity
  htmlWhitespaceSensitivity: 'css',

  // Line Breaks
  endOfLine: 'auto',

  // Print Width
  printWidth: 80,

  // Plugins
  plugins: [
    '@trivago/prettier-plugin-sort-imports'
  ],

  // Import Sorting
  importOrder: [
    '^react(/.*)?$',
    '^next(/.*)?$',
    '^@supabase(/.*)?$',
    '^@/(.*)$',
    '^[./]'
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true
}
