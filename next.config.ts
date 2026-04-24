import type { NextConfig } from "next";
import path from "node:path";
import { withBotId } from "botid/next/config";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  outputFileTracingRoot: path.join(__dirname),
};

export default withBotId(nextConfig);
