import { withKnobs, number, boolean } from '@storybook/addon-knobs';

import SudokuDigitButton from './';

const components = { SudokuDigitButton };

export default {
	title: 'Atoms|Sudoku Cell Controls / Digits',
	decorators: [withKnobs],
};

export const basic = () => ({
	components,
	props: {
		digit: {
			default: number('Digit', 1, { max: 9, min: 1, step: 1 }),
		},
		disabled: {
			default: boolean('Disabled', false),
		},
	},
	template: '<sudoku-digit-button :disabled="disabled">{{ digit }}</sudoku-digit-button>',
});

export const disabled = () => ({
	components,
	props: {
		digit: {
			default: number('Digit', 1, { max: 9, min: 1, step: 1 }),
		},
	},
	template: '<sudoku-digit-button disabled="true">{{ digit }}</sudoku-digit-button>',
});
