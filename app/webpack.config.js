const path = require("path");
const {
	merge
} = require("webpack-merge");
const common = require("./.webpack/webpack.common");

const DEVELOPMENT = "development";

module.exports = (_, args) => {
	if (args.mode === DEVELOPMENT) {
		return merge(common, {
			devServer: {
				static: {
					directory: path.resolve(__dirname, "dist"),
					publicPath: "/"
				},
				historyApiFallback: true,
				compress: true,
				hot: true,
				open: true,
				port: 4000,
			},
		});
	}

	return common;
};
