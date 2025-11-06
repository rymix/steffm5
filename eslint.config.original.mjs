import path from "node:path";
import { fileURLToPath } from "node:url";

import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
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

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const compat = new FlatCompat({
  baseDirectory: dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

// ✅ Manual unicorn plugin integration
const unicornRecommended = {
  plugins: {
    unicorn: fixupPluginRules(unicorn),
  },
  rules: {
    ...unicorn.configs.recommended.rules,
  },
};

const config = [
  {
    ignores: [
      "**/.DS_Store",
      ".husky/_",
      "**/.next",
      "**/.ignore",
      "**/_static",
      "**/build",
      "**/libs",
      "**/node_modules",
      "**/out",
      "**/public",
      "**/scripts",
      "**/*.config.js",
      "utils/libs",
      "**/post-build.js",
      "components/Mr2",
      "server.js",
      "components/Admin",
    ],
  },
  ...fixupConfigRules(
    compat.extends(
      "airbnb",
      "airbnb/hooks",
      "eslint:recommended",
      "plugin:import/typescript",
      "plugin:jest/recommended",
      "plugin:@next/next/recommended",
      "plugin:prettier/recommended",
      "plugin:react/recommended",
      "plugin:react-hooks/recommended",
      "plugin:testing-library/react",
      "prettier",
      "next",
      "next/core-web-vitals",
    ),
  ),
  unicornRecommended,
  {
    plugins: {
      "@typescript-eslint": fixupPluginRules(typescriptEslint),
      import: fixupPluginRules(_import),
      jest: fixupPluginRules(jest),
      prettier: fixupPluginRules(prettier),
      react: fixupPluginRules(react),
      "react-hooks": fixupPluginRules(reactHooks),
      "simple-import-sort": simpleImportSort,
      sonarjs: fixupPluginRules(sonarjs),
      "testing-library": fixupPluginRules(testingLibrary),
    },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
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
      "prettier/prettier": [
        "error",
        {
          endOfLine: "crlf",
          trailingComma: "all",
          singleQuote: false,
        },
      ],
      "@next/next/no-document-import-in-page": "off",
      "@next/next/no-img-element": "off",
      "@typescript-eslint/ban-types": "off",
      "@typescript-eslint/explicit-function-return-type": [
        "error",
        {
          allowExpressions: true,
        },
      ],
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          ignoreRestSiblings: true,
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "import/extensions": [
        "error",
        "ignorePackages",
        {
          ts: "never",
          tsx: "never",
        },
      ],
      "import/no-cycle": "off",
      "import/no-named-as-default": "off",
      "import/prefer-default-export": "off",
      "no-console": "off",
      "no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "no-promise-executor-return": "off",
      "no-underscore-dangle": "off",
      "no-unsafe-optional-chaining": "off",
      "react-hooks/exhaustive-deps": "off",
      "react/function-component-definition": "off",
      "react/jsx-filename-extension": [
        "error",
        {
          extensions: [".tsx"],
        },
      ],
      "react/jsx-no-useless-fragment": "off",
      "react/jsx-props-no-spreading": "off",
      "react/require-default-props": "off",
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
      "simple-import-sort/exports": "error",
      "simple-import-sort/imports": "error",
      "sonarjs/cognitive-complexity": "off",
      "sonarjs/no-nested-template-literals": "off",
      "testing-library/prefer-screen-queries": "error",
      "testing-library/render-result-naming-convention": "error",
      "unicorn/expiring-todo-comments": "off",
      "unicorn/filename-case": "off",
      "unicorn/import-style": "off",
      "unicorn/no-array-for-each": "off",
      "unicorn/no-array-reduce": "off",
      "unicorn/no-array-reverse": "off",
      "unicorn/no-nested-ternary": "off",
      "unicorn/no-null": "off",
      "unicorn/numeric-separators-style": "off",
      "unicorn/prefer-dom-node-append": "off",
      "unicorn/prefer-module": "off",
      "unicorn/prefer-node-protocol": "off",
      "unicorn/prefer-string-replace-all": "off",
      "unicorn/prefer-string-slice": "off",
      "unicorn/switch-case-braces": "off",
      "unicorn/prevent-abbreviations": "off",
      "no-restricted-globals": "off",
      "no-alert": "off",
      "no-unused-expressions": "off",
    },
  },
];

export default config;
