const path = require("path");

module.exports = {
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			issuer: {
				test: /\.(js|ts)x?$/,
			},
			use: ["@svgr/webpack"],
		});
		return config;
	},
	sassOptions: {
		includePaths: [path.join(__dirname, "styles")],
	},
	images: {
		loader: "imgix",
		path: "http://deinhausmann.com.s3-website.ap-south-1.amazonaws.com/",
	},
	exportPathMap: async function (defaultPathMap, { dev, dir, outDir, distDir, buildId }) {
		return {
			"/": { page: "/" },
		}
	},
};
