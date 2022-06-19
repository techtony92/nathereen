/** @type {import('next').NextConfig} */

const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ["source.unsplash.com"],
	},
	webpack: (
		nextConfig,
		{ buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
	) => {
		return nextConfig;
	},
};

module.exports = nextConfig;
