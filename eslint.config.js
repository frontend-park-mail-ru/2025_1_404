import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    ignores: ["**/*.precompiled.js", "**/*.min-*.js"],
  },
  {
    rules: {
      "no-unused-vars": [
        "error",
        {
          varsIgnorePattern: "^_", // Игнорируем переменные, начинающиеся с _
          argsIgnorePattern: "^_", // Игнорируем параметры, начинающиеся с _
        },
      ],
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        Handlebars: "readonly",
        process: "readonly",
      },
    },
  },
  pluginJs.configs.recommended,
];