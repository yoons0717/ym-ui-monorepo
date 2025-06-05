/** @type {import('next').NextConfig} */
const nextConfig = {
  // 🔥 중요: monorepo에서 다른 패키지를 사용할 때 필수 설정
  transpilePackages: ["@ym-ui/uikit"],
};

module.exports = nextConfig;
