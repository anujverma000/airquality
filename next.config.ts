import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.externals = [...config.externals, { knex: 'knex' }]
    return config
  },
  headers: async () => [
    {
      source: '/api/(.*)',
      headers: [
        { key: 'Access-Control-Allow-Credentials', value: 'true' },
        { key: 'Access-Control-Allow-Origin', value: '*' },
        { key: 'Access-Control-Allow-Methods', value: 'GET,POST' },
      ]
    }
  ]
};

export default nextConfig;
