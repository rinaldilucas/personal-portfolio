const OFF = 0,
    WARN = 1,
    ERROR = 2;

module.exports = {
    root: true,
    extends: ['eslint:recommended'],
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    env: {
        es6: true,
        node: true,
        browser: true,
    },
    overrides: [
        {
            files: ['**/*.ts'],
            plugins: ['@typescript-eslint'],
            extends: ['plugin:@typescript-eslint/recommended', 'standard'],
            globals: {
                Atomics: 'readonly',
                SharedArrayBuffer: 'readonly',
            },
            rules: {
                indent: [2, 4],
                semi: [ERROR, 'always'],
                'dot-notation': OFF,
                'no-undef': OFF,
                'no-unused-vars': WARN,
                '@typescript-eslint/no-var-requires': OFF,
                '@typescript-eslint/no-this-alias': OFF,
                '@typescript-eslint/no-explicit-any': OFF,
                'prefer-rest-params': OFF,
                'prefer-spread': OFF,
                'no-new': OFF,
                'n/handle-callback-err': OFF,
                '@typescript-eslint/no-unused-vars': WARN,
                'new-cap': OFF,
                'no-debugger': WARN,
            },
        },
    ],
    ignorePatterns: ['node_modules/', 'docs/', '*.d.ts'],
};
