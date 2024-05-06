/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    // TODO: Fix les suspens dans detail / liste clients
    experimental: {
      missingSuspenseWithCSRBailout: false,
    },
  };

export default nextConfig;
