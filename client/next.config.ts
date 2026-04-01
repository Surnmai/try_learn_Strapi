import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    dangerouslyAllowLocalIP: true, // Solves this error ⨯ upstream image http://localhost:1337/uploads/large_surfcamp_62b9379a3a_61190e5eda.png resolved to private ip ["::1","127.0.0.1"]
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**/*",
      },
    ],
  },
};

export default nextConfig;
