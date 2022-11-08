/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        loader: "default",
        domains: ["localhost"],
    },
    i18n:
    {
        locales: ["pl", "en"],
        defaultLocale: "pl",
    }
}

module.exports = nextConfig
