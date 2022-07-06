const CSS_MODULES_RULE = /\.module\.css$/;

module.exports = [{
		test: /\.(ts|tsx|js)$/,
		exclude: /node_modules/,
		use: {
			loader: "ts-loader",
		},
	},
	{
		test: /\.css$/,
		use: ["style-loader", "css-loader"],
		exclude: CSS_MODULES_RULE
	},
	{
		test: /\.css$/,
		use: [
			"style-loader",
			"@teamsupercell/typings-for-css-modules-loader",
			{
				loader: "css-loader",
				options: {
					modules: {
						localIdentName: "[folder]_[local]__[hash:base64:5]",
					},
				},
			},
		],
		include: CSS_MODULES_RULE
	},
	{
		test: /\.(png|jpg|gif|svg|jpeg)$/,
		loader: "file-loader",
		options: {
			name: "[name].[ext]",
		},
	},
];
