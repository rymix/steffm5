import js from "@eslint/js";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import _import from "eslint-plugin-import";
import jest from "eslint-plugin-jest";
import prettier from "eslint-plugin-prettier";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import sonarjs from "eslint-plugin-sonarjs";
import testingLibrary from "eslint-plugin-testing-library";
import unicorn from "eslint-plugin-unicorn";
import globals from "globals";

const config = [
  {
    ignores: [
      "**/.DS_Store",
      "**/.next",
      "**/build",
      "**/node_modules",
      "**/out",
      "**/public",
      "**/*.config.js",
      "**/demo",
      "**/dist",
    ],
  },
  js.configs.recommended,
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    plugins: {
      "@typescript-eslint": typescriptEslint,
      import: _import,
      jest,
      prettier,
      react,
      "react-hooks": reactHooks,
      "simple-import-sort": simpleImportSort,
      sonarjs,
      "testing-library": testingLibrary,
      unicorn,
    },
    languageOptions: {
      parser: typescriptParser,
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.jest,
        ...globals.node,
        React: "readonly",
        JSX: "readonly",
        NodeJS: "readonly",
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      // Prettier
      "prettier/prettier": [
        "error",
        {
          endOfLine: "lf",
          trailingComma: "all",
          singleQuote: false,
        },
      ],
      
      // TypeScript
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          ignoreRestSiblings: true,
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      
      // Import/Export
      "import/extensions": "off",
      "import/prefer-default-export": "off",
      "simple-import-sort/exports": "error",
      "simple-import-sort/imports": "error",
      
      // React
      "react/jsx-filename-extension": [
        "error",
        {
          extensions: [".tsx"],
        },
      ],
      "react/jsx-props-no-spreading": "off",
      "react/require-default-props": "off",
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
      
      // General
      "no-console": "off",
      "no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      
      // Testing
      "testing-library/prefer-screen-queries": "error",
      "testing-library/render-result-naming-convention": "error",
      
      // Unicorn (selective)
      "unicorn/filename-case": "off",
      "unicorn/prefer-module": "off",
      "unicorn/prevent-abbreviations": "off",
    },
  },
];

export default config;