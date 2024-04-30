module.exports = {
    ignorePatterns: ['.eslintrc.js', 'README.md'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json',
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint/eslint-plugin'],
    extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
    root: true,
    env: {
        node: true,
        jest: true,
    },
    rules: {
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/explicit-function-return-type': 'error',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'max-len': ['error', { code: 120, ignoreUrls: true, ignorePattern: '^import .*', ignoreStrings: true }],
        'no-debugger': ['error'],
        '@typescript-eslint/no-restricted-imports': [
            'error',
            { patterns: [{ group: ['*../../*'], message: 'Please use import like: "@src/users/..."' }] },
        ],
        '@typescript-eslint/no-unused-vars': [
            'error',
            { argsIgnorePattern: '^_', ignoreRestSiblings: true },
        ],
        'max-lines-per-function': ['warn',  {
          max: 75,
          skipBlankLines: true,
          skipComments: true,
          IIFEs: true,
        }],
        '@typescript-eslint/no-duplicate-imports': 'error',
    },
};
