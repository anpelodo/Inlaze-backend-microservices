module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: [
    "@typescript-eslint/eslint-plugin",
    "simple-import-sort",
    // "unused-import",
    "prettier",
  ],
  extends: ["plugin:@typescript-eslint/recommended", "prettier"],
  rules: {
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    // "no-console": "warning", // Means warning
    "prettier/prettier": "error", // Means error
  },
  root: true,
  env: {
    node: true,
    // jest: true,
  },
  ignorePatterns: [".eslintrc.js", "commitlint.config.js", "jest.config.js"],
};
