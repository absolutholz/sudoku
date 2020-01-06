import { withKnobs, number } from '@storybook/addon-knobs';

import TimerDisplay from './';

const components = { TimerDisplay };
const template = '<timer-display :seconds="seconds" />';

export default {
	title: 'Molecules|Timer Display',
	decorators: [withKnobs],
};

export const basic = () => ({
	components,
	props: {
		seconds: {
			default: number('Seconds', 0, { min: 0, step: 1 }),
		},
	},
	template,
});

export const seconds = () => ({
	components,
	props: {
		seconds: {
			default: number('Seconds', 59, { min: 0, step: 1 }),
		},
	},
	template,
});

export const minutes = () => ({
	components,
	props: {
		seconds: {
			default: number('Seconds', 2500, { min: 0, step: 1 }),
		},
	},
	template,
});

export const hours = () => ({
	components,
	props: {
		seconds: {
			default: number('Seconds', 59000, { min: 0, step: 1 }),
		},
	},
	template,
});
