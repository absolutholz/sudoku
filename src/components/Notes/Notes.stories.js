import { withKnobs, number, array } from '@storybook/addon-knobs';

import Notes from './Notes.vue';

export default {
	title: 'Molecules|Notes',
	decorators: [withKnobs],
};

export const basic = () => ({
	components: { Notes },
	props: {
		notes: {
			default: array('Notes', [false, false, false, false, false, false, false, false, false]),
		},
		activeDigit: {
			default: number('Active Digit', 0, { range: true, min: 0, max: 9, step: 1 }),
		},
	},
	template: '<notes :notes="notes" activeDigit="activeDigit" />',
});
