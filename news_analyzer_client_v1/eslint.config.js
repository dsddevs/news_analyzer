import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import typescriptPlugin from "@typescript-eslint/eslint-plugin";
import prettierPlugin from "eslint-config-prettier";
import reactPlugin from 'eslint-plugin-react';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';

export default [
    {
        ignores: ['dist'],
    },
    {
        extends: ['react-app', 'prettier'],
    },
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            sourceType: 'module',
            globals: globals.browser,
        },
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
            '@typescript-eslint': typescriptPlugin,
            'react': reactPlugin,
            'jsx-a11y': jsxA11yPlugin,
        },
        rules: {
            ...js.configs.recommended.rules,
            ...reactHooks.configs.recommended.rules,
            ...typescriptPlugin.configs.recommended.rules,
            ...prettierPlugin.rules,
            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true },
            ],
            'semi': ['error', 'always'],
            'quotes': ['error', 'double'],
            'react/react-in-jsx-scope': 'off',
        },
    },
];