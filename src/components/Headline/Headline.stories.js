import { withKnobs, text } from '@storybook/addon-knobs';
import { withContexts } from '@storybook/addon-contexts/vue';
import { contexts } from '../../../.storybook/configs/contexts';

import Hdln from './';

export default {
	title: 'Atoms|Headlines',
	decorators: [
		withKnobs(),
		withContexts(contexts)
	],
};

export const page = () => ({
	components: { Hdln },
	props: {
		content: {
			default: text('Content', 'Page'),
		},
		highlight: {
			default: text('Highlight', 'Headline'),
		},
	},
	template: '<hdln nodeType="h1" variant="page">{{ content }} <b>{{ highlight }}</b></hdln>',
});

export const sector = () => ({
	components: { Hdln },
	props: {
		content: {
			default: text('Content', 'Sector'),
		},
		highlight: {
			default: text('Highlight', 'Headline'),
		},
	},
	template: '<hdln h2 variant="sector">{{ content }} <b>{{ highlight }}</b></hdln>',
});
