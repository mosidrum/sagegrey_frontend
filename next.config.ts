import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "starwars-visualguide.com",
        pathname: "/assets/img/**",
      },
    ],
  },
};

export default nextConfig;
