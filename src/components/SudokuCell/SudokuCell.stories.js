// import { withKnobs, number, boolean } from '@storybook/addon-knobs';

// import SudokuCell from './SudokuCell.vue';

// export default {
// 	title: 'Molecules|Sudoku Cell',
// 	decorators: [withKnobs],
// };

// export const basic = () => ({
// 	components: { SudokuCell },
// 	props: {
// 		digit: {
// 			default: number('Digit', 1, { max: 9, min: 1, step: 1 }),
// 		},
// 		isOriginal: {
// 			default: boolean('Original', false),
// 		},
// 		isActive: {
// 			default: boolean('Active', false),
// 		},
// 		isInvalid: {
// 			default: boolean('Invalid', false),
// 		},
// 		isPeerCell: {
// 			default: boolean('Peer Cell', false),
// 		},
// 		isPeerDigit: {
// 			default: boolean('Peer Digit', false),
// 		},
// 	},
// 	template: `
// 		<sudoku-cell
// 			:col="0"
// 			:row="0"
// 			:subgrid="0"
// 			:isOriginal="isOriginal"
// 			:isActive="isActive"
// 			:isInvalid="isInvalid"
// 			:isPeerCell="isPeerCell"
// 			:isPeerDigit="isPeerDigit"
// 		>
// 			{{ digit }}
// 		</sudoku-cell>
// 	`,
// });
