import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  transpilePackages: ["@repo/agent"],
  serverExternalPackages: ["@copilotkit/runtime"],
};

export default nextConfig;
