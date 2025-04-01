/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com'],
  },
  async redirects() {
    return [
      {
        source: '/en/reservation',
        destination: '/en/reservation/step1',
        permanent: true,
      },
      {
        source: '/de/reservierung',
        destination: '/de/reservierung/step1',
        permanent: true,
      },
      {
        source: '/ru/rezervatsiya',
        destination: '/ru/rezervatsiya/step1',
        permanent: true,
      },
      {
        source: '/rezervasyon',
        destination: '/rezervasyon/step1',
        permanent: true,
      },
      {
        source: '/ru/reservation',
        destination: '/ru/rezervatsiya',
        permanent: true,
      },
      {
        source: '/de/reservation',
        destination: '/de/reservierung',
        permanent: true,
      },
      {
        source: '/reservation',
        destination: '/rezervasyon/step1',
        permanent: true,
      }
    ]
  },
}

module.exports = nextConfig; 