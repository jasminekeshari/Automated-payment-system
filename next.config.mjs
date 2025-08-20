/** @type {import('next').NextConfig} */
export default {
  images: {
    domains: [
      'res.cloudinary.com',
      'www.gstatic.com',
      'lh3.googleusercontent.com',
    ],
  },

  eslint: { ignoreDuringBuilds: true },

  // ⬇️  ➟ disables type-checking during `next build`
  typescript: {
    ignoreBuildErrors: true,
  },
};
