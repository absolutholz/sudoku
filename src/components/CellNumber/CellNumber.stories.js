import { withKnobs, number, boolean } from '@storybook/addon-knobs';

import CellNumber from './CellNumber.vue';

export default {
	title: 'Molecules',
	decorators: [withKnobs],
};

export const cellNumber = () => ({
	components: { CellNumber },
	template: `
		<div style="line-height: 1; xwidth: 200px;">
			<cell-number
				:digit="digit"
			></cell-number>
		</div>
	`,
	props: {
		digit: {
			default: number('Digit', 1, { max: 9, min: 1, step: 1 }),
		},
	// 	isOriginal: {
	// 		default: boolean('Original', false),
	// 	},
	// 	isActive: {
	// 		default: boolean('Active', false),
	// 	},
	// 	isInvalid: {
	// 		default: boolean('Invalid', false),
	// 	},
	// 	isPeerCell: {
	// 		default: boolean('Peer Cell', false),
	// 	},
	// 	isPeerDigit: {
	// 		default: boolean('Peer Digit', false),
	// 	},
	},
	// template: `
	// 	<sudoku-cell
	// 		:col="0"
	// 		:row="0"
	// 		:subgrid="0"
	// 		:isOriginal="isOriginal"
	// 		:isActive="isActive"
	// 		:isInvalid="isInvalid"
	// 		:isPeerCell="isPeerCell"
	// 		:isPeerDigit="isPeerDigit"
	// 	>
	// 		{{ digit }}
	// 	</sudoku-cell>
	// `,
});
