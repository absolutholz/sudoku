export const contexts = [
	{
		icon: 'paintbrush', // a icon displayed in the Storybook toolbar to control contextual props
		title: 'Themes', // an unique name of a contextual environment
		components: [
			// an array of components that is going to be injected to wrap stories
			/* Styled-components ThemeProvider, */
			/* Material-ui ThemeProvider, */
			'div',
		],
		params: [
			// an array of params contains a set of predefined `props` for `components`
			{ name: 'Purple Theme (Default)', props: { class: '' }, default: true },
			{ name: 'Blue Theme', props: { class: 't-blue' } },
			{ name: 'Red Theme', props: { class: 't-red' } },
			{ name: 'Green Theme', props: { class: 't-green' } },
		],
		options: {
			deep: false, // pass the `props` deeply into all wrapping components
			disable: false, // disable this contextual environment completely
			cancelable: false, // allow this contextual environment to be opt-out optionally in toolbar
		},
	},
	/* ... */ // multiple contexts setups are supported
];
