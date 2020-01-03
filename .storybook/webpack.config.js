const path = require('path');

module.exports = ({ config }) => {
	config.module.rules.push({
		test: /\.scss$/,
		use: [
			'vue-style-loader',
			'css-loader',
			{
				loader: 'sass-loader',
			},
		],
	});

	// https://github.com/storybookjs/storybook/issues/7360
	config.module.rules = config.module.rules.map(rule => {
		if (String(rule.test) === String(/\.(svg|ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/)) {
			return {
				...rule,
				test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/,
			};
		}
		return rule;
	});

	// now we can add our svg loader
	config.module.rules.push(
		{
			test: /\.svg$/,
			loader: 'vue-svg-loader', // `vue-svg` for webpack 1.x
			options: {
				svgo: {
					plugins: [
						{ removeXMLNS: true },
						{
							// https://github.com/guylando/svgo-addViewBox/blob/master/addViewBox.js
							// https://github.com/svg/svgo/issues/722#issuecomment-385028841
							removeSvgId: {
								type: 'perItem',
								name: 'convertDimensionsToViewbox',
								description: 'replaces width, height attributes of an svg with viewBox attribute to make it responsive',
								fn: function (item) {
									if (
										item.isElem(['svg']) &&
										!item.hasAttr('viewBox') &&
										item.hasAttr('width') &&
										item.hasAttr('height')
									) {
										var width = parseFloat(item.attr('width').value.replace(/px$/, ''));
										var height = parseFloat(item.attr('height').value.replace(/px$/, ''));
										item.removeAttr('width');
										item.removeAttr('height');
										item.addAttr({
											name: 'viewBox',
											prefix: '',
											local: 'viewBox',
											value: '0 0 ' + width + ' ' + height,
										});
									}
								},
							},
						},
					],
				},
			},
		},
	);

	return config;
};
