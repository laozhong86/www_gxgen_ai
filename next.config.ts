import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';
import bundleAnalyzer from '@next/bundle-analyzer';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  // 静态导出配置（用于部署到 Cloudflare Pages 等静态托管）
  // output: 'export',

  // 性能优化
  experimental: {
    // 优化包导入 - 减少 bundle 大小
    optimizePackageImports: ['lucide-react'],
  },
};

export default withBundleAnalyzer(withNextIntl(nextConfig));
