/** @type {import("eslint").Linter.Config} */
const config = {
  settings: {
    react: {
      version: "detect",
    },
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  plugins: ["@typescript-eslint", "react", "prettier"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
  ],
  rules: {
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      {
        prefer: "type-imports",
        fixStyle: "inline-type-imports",
      },
    ],
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: "^_",
      },
    ],
    "tailwindcss/no-custom-classname": "off",
    curly: "error",
    camelcase: "error",
    eqeqeq: "error",
    "no-undef": "off",
    "no-useless-escape": "off",
    "object-curly-newline": [
      "error",
      {
        ObjectExpression: "always",
        ObjectPattern: {
          multiline: true,
        },
      },
    ],
  },
};

module.exports = config;
