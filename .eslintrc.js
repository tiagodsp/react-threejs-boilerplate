module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        'plugin:react/recommended',
        'airbnb',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: [
        'react',
        '@typescript-eslint',
    ],
    rules: {
        // Indent with 4 spaces
        'indent': ['error', 4],

        // Indent JSX with 4 spaces
        'react/jsx-indent': ['error', 4],

        // Indent props with 4 spaces
        'react/jsx-indent-props': ['error', 4],
        
        'linebreak-style': 'off',
        'react/jsx-filename-extension': 'off',
        'react/prefer-stateless-function': 'off',
        'import/extensions': 'off',
    },
    settings: {
        'import/resolver': {
            webpack: {
                config: 'webpack.config.js',
            },
        },
    },
};
