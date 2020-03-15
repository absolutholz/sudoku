import { withKnobs, text } from '@storybook/addon-knobs';
import { withContexts } from '@storybook/addon-contexts/vue';
import { contexts } from '../../../.storybook/configs/contexts';

import Btn from './';

// https://material.io/components/buttons/#anatomy

export default {
	title: 'Atoms|Buttons/As Anchor',
	decorators: [withKnobs, withContexts(contexts)],
};

export const standard = () => ({
	components: { Btn },
	props: {
		content: {
			default: text('Content', 'Button'),
		},
	},
	template: '<btn href="#" nodeType="a">{{ content }}</btn>',
});

export const outlined = () => ({
	components: { Btn },
	props: {
		content: {
			default: text('Content', 'Button'),
		},
	},
	template: '<btn href="#" nodeType="a" variant="outlined">{{ content }}</btn>',
});

export const contained = () => ({
	components: { Btn },
	props: {
		content: {
			default: text('Content', 'Button'),
		},
	},
	template: '<btn href="#" nodeType="a" variant="contained">{{ content }}</btn>',
});
