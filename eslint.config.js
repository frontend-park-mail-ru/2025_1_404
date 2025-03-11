import globals from "globals";
import pluginJs from "@eslint/js";


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
      },
    },
    rules: {
      "no-unused-vars": [
        "error",
        {
           // Игнорируем параметры, начинающиеся с _
          argsIgnorePattern: "^_",
           // Игнорируем переменные, начинающиеся с _
          varsIgnorePattern: "^_",
        },
      ],
      "no-underscore-dangle": "off",
      "complexity": ["error", { "max": 3 }],
      "strict": "off",
    },
  },
  
];