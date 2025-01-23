import { withPayload } from "@payloadcms/next/withPayload";

import redirects from "./redirects.js";

const NEXT_PUBLIC_SERVER_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : undefined || process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: [
        "localhost:3000", // localhost
        "127.0.0.1:3000", // localhost
        "https://probable-giggle-4vwr96p5gr9c576g-3000.app.github.dev/", // Codespaces
      ],
    },
  },
  images: {
    remotePatterns: [
      ...[NEXT_PUBLIC_SERVER_URL /* 'https://example.com' */].map((item) => {
        const url = new URL(item);

        return {
          hostname: url.hostname,
          protocol: url.protocol.replace(":", ""),
        };
      }),
    ],
  },
  reactStrictMode: true,
  redirects,
};

export default withPayload(nextConfig);
