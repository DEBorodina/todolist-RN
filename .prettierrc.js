module.exports = {
  arrowParens: 'avoid',
  bracketSameLine: true,
  bracketSpacing: true,
  singleQuote: true,
  trailingComma: 'all',
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  importOrder: [
    '<THIRD_PARTY_MODULES>',
    '^@?\\w',
    '^[../../]',
    '^[./]',
    '^jest-fetch-mock',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
