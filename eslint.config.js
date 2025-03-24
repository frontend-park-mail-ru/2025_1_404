import globals from "globals";
import pluginJs from "@eslint/js";

const MAX_STATEMENTS = 15

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
    rules: {
      "camelcase": "off",
      "class-methods-use-this": "off",
      "complexity": ["error", { "max": 5 }],
      "func-names": ["error", "as-needed"], 
      "max-statements": ["error", MAX_STATEMENTS],
      "no-console": "off",
      "no-empty-function": "off",
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
      "one-var":"off",
      "prefer-template": "off",
      "strict": "off",
    },
  },
];