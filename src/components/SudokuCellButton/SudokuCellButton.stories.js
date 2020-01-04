import { withKnobs, number, boolean } from '@storybook/addon-knobs';

import SudokuCellButton from './SudokuCellButton.vue';

export default {
	title: 'Atoms|Sudoku Cell Button',
	decorators: [withKnobs],
};

export const basic = () => ({
	components: { SudokuCellButton },
	props: {
		digit: {
			default: number('Digit', 0, { max: 9, min: 1, step: 1 }),
		},
		disabled: {
			default: boolean('Disabled', false),
		},
	},
	template: '<sudoku-cell-button :disabled="disabled">{{ digit }}</sudoku-cell-button>',
});

export const disabled = () => ({
	components: { SudokuCellButton },
	props: {
		digit: {
			default: number('Digit', 0, { max: 9, min: 1, step: 1 }),
		},
	},
	template: '<sudoku-cell-button disabled="true">{{ digit }}</sudoku-cell-button>',
});
