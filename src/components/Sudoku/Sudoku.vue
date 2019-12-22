<template>
	<div class="sudoku">
		<div class="row">
			<h2>Sudoku</h2>

			<strong>{{ formattedTime }}</strong>

			<select @change="generatePuzzle()" v-model="difficulty">
				<option
					v-for="(display, level) in levels"
					:key="level"
					:value="level"
					>{{ display }}</option
				>
			</select>
		</div>

		<ol class="grid2">
			<li
				:aria-label="`Subgrid ${cell.subgrid + 1}; row ${cell.row + 1}; column ${cell.col + 1}`"
				v-for="(cell, cellIndex) in cells" :key="`cell-${cellIndex}`"
			>
				<cell
					@active="setCellActive"
					:isActive="activeRow === cell.row && activeCol === cell.col"
					:isInvalid="cell.value && isCellInvalid(cell.row, cell.col, cell.value)"
					:isOriginal="cell.original"
					:isRelated="activeRow === cell.row || activeCol === cell.col || activeSubgrid === cell.subgrid"
					:isPeer="activeValue !== -1 && activeValue === cell.value"
					:row="cell.row"
					:col="cell.col"
					:subgrid="cell.subgrid"
					:value="cell.value"
					:notes="cell.notes"
				>
					<template>{{ cell.value }}</template>
				</cell>
			</li>
		</ol>

		<div class="row">
			<button
				class="btn"
				@mousedown.prevent="isNotesMode ? setCellNote(value + 1) : setCellValue(value + 1)"
				:disabled="activeIsOriginal || activeRow === -1 || activeCol === -1"
				type="button"
				v-for="value in Array(9).keys()"
				:key="`entry-${value}`"
			>
				{{ value + 1 }}
			</button>
			<button
				@mousedown.prevent="clearCell"
			>
				X
			</button>
		</div>

		<div class="row">
			<button
				@mousedown.prevent="toggleNotesMode"
			>
				notes
			</button>
		</div>
	</div>
</template>

<script>
import { sudoku } from 'sudoku.js/sudoku.js';

import Cell from './../../components/Cell';

export default {
	name: 'Sudoku',

	components: {
		Cell,
	},

	data() {
		return {
			puzzle: [],
			difficulty: 'easy',
			activeRow: -1,
			activeSubgrid: -1,
			activeCol: -1,
			activeValue: -1,
			levels: {
				'easy': 'Easy',
				'medium': 'Medium',
				'hard': 'Hard',
				'very-hard': 'Very Hard',
				'insane': 'Insane',
				'inhuman': 'Inhuman',
			},
			seconds: 0,
			timer: null,
			isNotesMode: false,
			activeIsOriginal: false,
		};
	},

	// mounted() {
	// 	this.generatePuzzle();
	// },

	computed: {
		formattedTime() {
			const min = Math.floor(this.seconds / 60);
			const sec = this.seconds % 60;

			return `${min > 9 ? min : `0${min}`}:${sec > 9 ? sec : `0${sec}`}`;
		},

		cells() {
			const cells = Array(81);

			if (!this.puzzle.length) {
				this.generatePuzzle();
			}

			for (let r = 0; r < 9; r += 1) {
				for (let c = 0; c < 9; c += 1) {
					cells[(r * 9) + c] = this.puzzle[r][c];
				}
			}

			return cells;
		},

		columns() {
			const columns = Array(9);
			this.cells.forEach(cell => {
				if (!columns[cell.col]) {
					columns[cell.col] = Array();
				}
				columns[cell.col].push(cell);
			});
			return columns;
		},

		rows() {
			return this.puzzle;
		},

		subgrids() {
			const subgrids = Array(9);
			this.cells.forEach(cell => {
				if (!subgrids[cell.subgrid]) {
					subgrids[cell.subgrid] = Array();
				}
				subgrids[cell.subgrid].push(cell);
			});
			return subgrids;
		},
	},

	methods: {
		generatePuzzle() {
			const boardString = sudoku.generate(this.difficulty);
			this.puzzle = sudoku.board_string_to_grid(boardString).map((row, rowIndex) => {
				return row.map((cell, colIndex) => {
					const oCell = {
						value: cell !== '.' ? parseInt(cell) : null,
						original: cell !== '.',
						row: rowIndex,
						col: colIndex,
						subgrid: (Math.floor(rowIndex / 3) * 3) + Math.floor(colIndex / 3),
					};

					if (!oCell.original) {
						oCell.notes = [false, false, false, false, false, false, false, false, false];
					}

					return oCell;
				});
			});

			this.seconds = 0;
			clearInterval(this.timer);
			this.timer = setInterval(() => {
				this.seconds += 1;
			}, 1000);
		},

		toggleNotesMode() {
			this.isNotesMode = !this.isNotesMode;
		},

		setCellActive(row, col, subgrid, value, original) {
			// if (original) {
			// 	return;
			// }

			if (this.activeRow === row && this.activeCol === col) {
				this.activeRow = -1;
				this.activeSubgrid = -1;
				this.activeCol = -1;
				this.activeValue = -1;
				this.activeIsOriginal = false;
				return;
			}

			this.activeRow = row;
			this.activeSubgrid = subgrid;
			this.activeCol = col;
			this.activeValue = value || -1;
			this.activeIsOriginal = original;
			return;
		},

		setCellValue(value) {
			this.clearCellNotes();

			this.puzzle[this.activeRow][this.activeCol].value = value;
			// this.activeRow = -1;
			// this.activeSubgrid = -1;
			// this.activeCol = -1;
			// this.activeValue = -1;

			if (this.isGameComplete()) {
				const msg = [
					'Success!',
					'\n',
					`Difficulty: ${this.levels[this.difficulty]}`,
					`Time: ${this.formattedTime}`,
				];

				alert(msg.join("\n"));
				this.generatePuzzle();
			}
		},

		setCellNote(value) {
			if (!this.original) {
				if (this.puzzle[this.activeRow][this.activeCol].value > 0) {
					this.clearCellValue();
				}

				this.puzzle[this.activeRow][this.activeCol].notes.splice(value - 1, 1, !this.puzzle[this.activeRow][this.activeCol].notes[value - 1]);
			}
		},

		clearCell() {
			this.clearCellValue();
			this.clearCellNotes();
		},

		clearCellValue() {
			this.puzzle[this.activeRow][this.activeCol].value = null;
		},

		clearCellNotes() {
			this.puzzle[this.activeRow][this.activeCol].notes = Array(9);
		},

		isCellInvalid(row, col, value) {
			if (!value) {
				return true;
			}

			for (let c = 0; c < 9; c += 1) {
				if (this.puzzle[row][c].value === value && c !== col) {
					return true;
				}
			}

			for (let r = 0; r < 9; r += 1) {
				if (this.puzzle[r][col].value === value && r !== row) {
					return true;
				}
			}

			const rowStart = Math.floor(row / 3) * 3;
			const colStart = Math.floor(col / 3) * 3;

			for (let r = rowStart; r < rowStart + 3; r += 1) {
				for (let c = colStart; c < colStart + 3; c += 1) {
					if (
						this.puzzle[r][c].value === value &&
						!(r === row && c === col)
					) {
						return true;
					}
				}
			}

			return false;
		},

		isGameComplete() {
			for (let r = 0; r < 9; r += 1) {
				for (let c = 0; c < 9; c += 1) {
					if (this.isCellInvalid(r, c, this.puzzle[r][c].value)) {
						return false;
					}
				}
			}
			return true;
		},
	},
};
</script>

<style lang="scss">
@import "~scss-mixins-functions-variables/scss/reset/list/reset-list-mixins";

.sudoku {
	--bg: #fffffe;
	--color: #111;
	--highlight: lightskyblue;

	// max-width: 420px;
	background: var(--bg);
	color: var(--color);
}

// .row {
// 	align-items: center;
// 	display: flex;
// 	justify-content: space-between;
// }

// .grid {
// 	margin: 0.5rem auto 1rem;
// 	width: 360px;
// }

.grid2 {
	$sudoku-grid-gap-thickness: 1px;
	$length: 70%;

	@include reset-list;

	display: grid;
	font-size: 2rem;
	grid-gap: $sudoku-grid-gap-thickness;
	grid-template-columns: repeat(9, 1fr);
	max-width: 100%;
	position: relative;

	@media screen and (orientation: landscape) {
		// font-size: 7vh;
		// max-height: 100vh;
	}

	&::before {
		background: var(--color);
		bottom: 0;
		content: "";
		left: 0;
		opacity: 0.25;
		position: absolute;
		right: 0;
		top: 0;
	}

	> * {
		background: white;
		padding-bottom: 100%;
		position: relative;

		> * {
			height: 100%;
			left: 0;
			position: absolute;
			top: 0;
			width: 100%;
		}
	}


	// > * {
	// 	position: relative;

	// 	&:nth-child(3n) {
	// 		&::before {
	// 			background: var(--color);
	// 			bottom: 0;
	// 			content: "";
	// 			opacity: 0.75;
	// 			position: absolute;
	// 			right: $sudoku-grid-gap-thickness * -1;
	// 			top: 0;
	// 			width: $sudoku-grid-gap-thickness * 3;
	// 		}
	// 	}

	// 	&:nth-child(9n) {
	// 		&::before {
	// 			display: none;
	// 		}
	// 	}

	// 	&:nth-child(n + #{(9 * (3 - 1)) + 1}):nth-child(-n + #{9 * 3}),
	// 	&:nth-child(n + #{(9 * (6 - 1)) + 1}):nth-child(-n + #{9 * 6}) {
	// 		&::after {
	// 			background: var(--color);
	// 			bottom: $sudoku-grid-gap-thickness * -1;
	// 			content: "";
	// 			height: $sudoku-grid-gap-thickness * 3;
	// 			left: 0;
	// 			opacity: 0.75;
	// 			position: absolute;
	// 			right: 0;
	// 		}
	// 	}

	// 	&:nth-last-child(-n + 9) {
	// 		&::after {
	// 			display: none;
	// 		}
	// 	}
	// }

// .cell {
// 	// border: 1px solid #bbb;
// 	cursor: pointer;
// 	display: block;
// 	font-size: 24px;
// 	line-height: 40px;
// 	height: 40px;
// 	position: relative;
// 	text-align: center;
// 	width: 40px;

// 	&::before,
// 	&::after {
// 		background: var(--color);
// 		content: "";
// 		opacity: 0.25;
// 		position: absolute;
// 	}

// 	&::before {
// 		bottom: (100% - $length) / 2;
// 		left: 100%;
// 		top: (100% - $length) / 2;
// 		width: $sudoku-grid-gap-thickness;
// 	}

// 	&::after {
// 		top: 100%;
// 		height: $sudoku-grid-gap-thickness;
// 		left: (100% - $length) / 2;
// 		right: (100% - $length) / 2;
// 	}

// 	&.border-right {
// 		// border-right-width: 3px;
// 	}

// 	&.border-bottom {
// 		// border-bottom-width: 3px;
// 	}

// 	&.original {
// 		cursor: default;
// 		font-weight: bold;
// 	}

// 	&.active {
// 		background: var(--highlight);
// 		color: white;
// 	}

// 	&.invalid:not(.active) {
// 		background: firebrick;
// 		color: white;
// 	}
}

.btn {
	cursor: pointer;
	height: 38px;
	width: 38px;

	&:disabled {
		cursor: not-allowed;
	}
}
</style>
