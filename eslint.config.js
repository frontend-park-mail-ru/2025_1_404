import globals from "globals";
import jsdoc from "eslint-plugin-jsdoc";
import pluginJs from "@eslint/js";

const MAX_STATEMENTS = 20

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
    pluginJs.configs.all,
    {
        ignores: ["**/*.precompiled.js", "**/*.min-*.js"],
    },
    {
        languageOptions: {
            ecmaVersion: "latest",
            globals: {
                ...globals.browser,
                Handlebars: "readonly",
                process: "readonly",
                ymaps: "readonly",
            },
        },
        plugins: {
            jsdoc,
        },
        rules: {
            "camelcase": "off",
            "class-methods-use-this": "off",
            "complexity": ["error", { "max": 15 }],
            "func-names": ["error", "as-needed"],
            "id-length": "off",
            "max-statements": ["error", MAX_STATEMENTS],
            "no-console": "off",
            "no-empty-function": "off",
            "no-magic-numbers": "off",
            "sort-keys": "off",
            "no-inline-comments": "off",
            "no-plusplus": "off",
            "no-ternary": "off",
            "no-underscore-dangle": "off",
            "no-unused-vars": [
                "error",
                {
                    // Игнорируем параметры, начинающиеся с _
                    argsIgnorePattern: "^_",
                    // Игнорируем переменные, начинающиеся с _
                    varsIgnorePattern: "^_",
                },
            ],
            "no-warning-comments": "off",
            "one-var":"off",
            "prefer-template": "off",
            "strict": "off",

            // JSDOC
            "jsdoc/check-access": 1,
            "jsdoc/check-alignment": 1,
            "jsdoc/check-template-names": 1,
            "jsdoc/check-property-names": 1,
            "jsdoc/check-tag-names": 1,
            "jsdoc/check-types": 1,
            "jsdoc/check-values": 1,
            "jsdoc/empty-tags": 1,
            "jsdoc/implements-on-classes": 1,
            "jsdoc/multiline-blocks": 1,
            "jsdoc/no-multi-asterisks": 1,
            "jsdoc/require-jsdoc": [
                1,
                {
                    require: {
                        FunctionDeclaration: true,
                        MethodDefinition: true,
                        ClassDeclaration: true,
                        ArrowFunctionExpression: false,
                        FunctionExpression: false,
                    },
                },
            ],
            "jsdoc/require-param": 1,
            "jsdoc/require-param-description": 1,
            "jsdoc/require-param-name": 1,
            "jsdoc/require-param-type": 1,
            "jsdoc/require-property": 1,
            "jsdoc/require-property-description": 1,
            "jsdoc/require-property-name": 1,
            "jsdoc/require-property-type": 1,
            "jsdoc/require-returns": 1,
            "jsdoc/require-returns-check": 1,
            "jsdoc/require-returns-description": 1,
            "jsdoc/require-returns-type": 1,
            "jsdoc/require-yields": 1,
            "jsdoc/require-yields-check": 1,
            "jsdoc/tag-lines": 1,
            "jsdoc/valid-types": 1
        },
    },
];