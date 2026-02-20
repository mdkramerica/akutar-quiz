import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'i2c.seadn.io' },
      { protocol: 'https', hostname: 'i.seadn.io' },
    ],
  },
};

export default nextConfig;
