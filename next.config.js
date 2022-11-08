/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        loader: "default",
        domains: ["localhost"],
    },
    i18n:
    {
        locales: ["pl", "en"],
        defaultLocale: "pl",
        localeDetection: false,
    }
}

module.exports = nextConfig
