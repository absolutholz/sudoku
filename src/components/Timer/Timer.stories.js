import { withKnobs, number } from '@storybook/addon-knobs';

import Timer from './Timer.vue';

export default {
	title: 'Molecules|Timer',
	decorators: [withKnobs],
};

export const basic = () => ({
	components: { Timer },
	props: {
		seconds: {
			default: number('Seconds', 0, { min: 0, step: 1 }),
		},
	},
	template: '<timer :seconds="seconds" />',
});
