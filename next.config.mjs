import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["geist"],
  webpack: (config) => {
    // Silencia el warning conocido de next-intl (extractor con import dinámico)
    config.ignoreWarnings = config.ignoreWarnings ?? [];
    config.ignoreWarnings.push({
      module: /node_modules\/next-intl\/.*\/extractor\//,
      message: /Parsing of .* for build dependencies failed/,
    });
    return config;
  },
};

export default withNextIntl(nextConfig);
