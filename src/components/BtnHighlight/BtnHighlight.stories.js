import { withKnobs, number, text } from '@storybook/addon-knobs';

import BtnHighlight from './';
import TimerDisplay from './../TimerDisplay';

const components = { BtnHighlight, TimerDisplay };

export default {
	title: 'Atoms|Buttons / Highlight',
	decorators: [withKnobs],
};

export const newGame = () => ({
	components,
	props: {
		content: {
			default: text('Content', 'New Game'),
		},
	},
	template: '<btn-highlight>{{ content }}</btn-highlight>',
});


export const resumeGame = () => ({
	components,
	props: {
		content: {
			default: text('Content', 'Resume Game'),
		},
		level: {
			default: text('Level', 'Easy'),
		},
		seconds: {
			default: number('Seconds', 123456, { min: 0, step: 1 }),
		},
	},
	template: '<btn-highlight>{{ content }}<div class="btn__small">{{ level }} - <timer-display :seconds="seconds" /></div></btn-highlight>',
});
