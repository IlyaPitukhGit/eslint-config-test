// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");
const noDirectToast = require("./eslint-rules/no-direct-toast");

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ["dist/*"],
  },
  {
    rules: {
      "no-console": "error",
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "react-native-toast-message",
              message: "Use ToastService instead of direct Toast API",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["app/components/Toast/ToastService.ts", "app/index.tsx"],
    rules: {
      "no-restricted-imports": "off",
    },
  },
  {
    plugins: {
      local: {
        rules: {
          "no-direct-toast": noDirectToast,
        },
      },
    },
    rules: {
      "local/no-direct-toast": "error",
    },
  },
  {
    files: ["app/components/Toast/ToastService.ts"],
    rules: {
      "local/no-direct-toast": "off"
    },
  },
]);
