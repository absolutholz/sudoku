module.exports = {
	chainWebpack: (config) => {
		const svgRule = config.module.rule('svg');

		svgRule.uses.clear();

		svgRule
			// .use('babel-loader')
			// .loader('babel-loader')
			// .end()
			.use('vue-svg-loader')
			.loader('vue-svg-loader')
			.tap(options => {
				return {
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
				};
			});
	},
};
