// vitest.config.ts
import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./test/setup.ts"],
    include: ["**/*.{test,spec}.{ts,tsx}"],
    exclude: [
      "node_modules/**",
      ".next/**",
      "dist/**",
      "build/**",
      "coverage/**",
      "fixtures/**",
      "**/__fixtures__/**",
      "**/*.fixture.*",
    ],
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
      exclude: [
        "next-env.d.ts",
        ".next/**",
        "app/**/layout.tsx",
        "app/**/page.tsx",
        "components/ui/**",
        "**/*.config.*",
        "**/*.d.ts",
        "fixtures/**",
        "**/__fixtures__/**",
      ],
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./", import.meta.url)),
    },
  },
});
