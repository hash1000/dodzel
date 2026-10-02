import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    loader: "custom",
    loaderFile: "./src/lib/media-image-loader.ts",
    deviceSizes: [640, 1080, 1920, 2560],
    imageSizes: [640],
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return process.env.NEXT_PUBLIC_ENV === "production"
      ? []
      : [
          {
            source: "/:path*",
            headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
          },
        ];
  },
  experimental: { serverActions: { bodySizeLimit: "11mb" } },
};

export default nextConfig;
