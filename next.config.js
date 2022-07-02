/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["links.papareact.com", "fakestoreapi.com"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    stripe_public_key: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    stripe_secret_key: process.env.STRIPE_SECRET_KEY,
    stripe_signing_secret: process.env.STRIPE_SIGNING_SECRET,
  },
};

module.exports = nextConfig;
