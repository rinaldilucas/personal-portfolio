var OFF = 0,
  WARN = 1,
  ERROR = 2;

module.exports = {
  root: true,
  ignorePatterns: ['node_modules/*', 'dist/*', 'develop/*'],
  env: {
    es6: true,
    node: true,
    browser: true,
  },
  overrides: [
    {
      plugins: ['path'],
      extends: ['airbnb-typescript/base', 'plugin:prettier/recommended'],
      files: ['*.ts'],
      parserOptions: {
        tsconfigRootDir: __dirname,
        sourceType: 'module',
        createDefaultProgram: true,
        project: ['./tsconfig.json'],
      },
      rules: {
        'path/no-relative-imports': [
          'warn',
          {
            maxDepth: 0,
            suggested: false,
          },
        ],
        'prettier/prettier': [
          'warn',
          {
            printWidth: 135,
            arrowParens: 'always',
            embeddedLanguageFormatting: 'auto',
            endOfLine: 'auto',
            htmlWhitespaceSensitivity: 'ignore',
            proseWrap: 'preserve',
            quoteProps: 'consistent',
            singleQuote: true,
            trailingComma: 'all',
          },
        ],
        '@typescript-eslint/naming-convention': [
          ERROR,
          {
            selector: 'variable',
            format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
            leadingUnderscore: 'allow',
          },
        ],
        '@typescript-eslint/explicit-function-return-type': ERROR,
        '@typescript-eslint/lines-between-class-members': OFF,
        '@typescript-eslint/no-unused-vars': [WARN, { varsIgnorePattern: '^_', argsIgnorePattern: '^_' }],
        'import/extensions': OFF,
        'import/no-extraneous-dependencies': OFF,
        'no-debugger': WARN,
        'no-lonely-if': ERROR,
        'semi': [ERROR, 'always'],
      },
    },
  ],
};
