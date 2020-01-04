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

export const seconds = () => ({
	components: { Timer },
	props: {
		seconds: {
			default: number('Seconds', 59, { min: 0, step: 1 }),
		},
	},
	template: '<timer :seconds="seconds" />',
});

export const minutes = () => ({
	components: { Timer },
	props: {
		seconds: {
			default: number('Seconds', 2500, { min: 0, step: 1 }),
		},
	},
	template: '<timer :seconds="seconds" />',
});

export const hours = () => ({
	components: { Timer },
	props: {
		seconds: {
			default: number('Seconds', 59000, { min: 0, step: 1 }),
		},
	},
	template: '<timer :seconds="seconds" />',
});
