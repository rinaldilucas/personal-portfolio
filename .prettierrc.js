module.exports = {
  arrowParens: 'always',
  embeddedLanguageFormatting: 'auto',
  endOfLine: 'auto',
  htmlWhitespaceSensitivity: 'css',
  importOrderParserPlugins: ['typescript', 'decorators-legacy'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: [require.resolve('@trivago/prettier-plugin-sort-imports')],
  printWidth: 135,
  proseWrap: 'preserve',
  quoteProps: 'consistent',
  trailingComma: 'all',
  overrides: [
    {
      files: '*.ts',
      options: {
        singleQuote: true,
        importOrder: [
          '^(?!(@app/.+|@root/.+|@styles/.+|@scripts/.+|@templates/.+|[./].*)$).*',
          '^(@app/.+|@root/.+|@styles/.+|@scripts/.+|@templates/.+|[./].*)$',
        ],
      },
    },
    {
      files: '*.js',
      options: {
        singleQuote: true,
      },
    },
  ],
};
