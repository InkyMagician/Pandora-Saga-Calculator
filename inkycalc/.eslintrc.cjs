module.exports = {
    root: true,
    env: {
        browser: true,
        es2020: true,
        node: true
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    settings: { react: { version: '18.2' } },
    plugins: ['react-refresh'],
    rules: {
        'react-refresh/only-export-components': [
            'warn',
            { allowConstantExport: true },
        ],
        'node/no-missing-import': 'off',
        'node/no-unpublished-require': 'off',
    },
    overrides: [
        {
            files: ['public/electron.js', 'public/preload.js'],
            env: {
                node: true,
                browser: false
            },
            rules: {
                'node/no-unpublished-require': 'off'
            }
        }
    ]
}