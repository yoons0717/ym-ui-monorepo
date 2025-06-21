import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  external: ["react", "react-dom"],
  clean: true,
  // CSS를 자동으로 처리
  esbuildOptions(options) {
    options.loader = {
      ...options.loader,
      ".css": "css",
    };
  },
  // CSS를 별도 파일로 추출
  splitting: false,
  sourcemap: false,
});
