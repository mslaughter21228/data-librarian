import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false as any,
  turbopack: {
    root: "/home/mslaughter-admin/projects/data-librarian-main",
  },
};

export default nextConfig;
