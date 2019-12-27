<template>
	<div class="sudoku">
		<div class="row">
			<h2>Sudoku</h2>

			<router-link to="/">Home</router-link>
			<router-link to="/settings">Settings</router-link>

			<timer
				:seconds="$store.state.seconds"
				@pause="pausePuzzle"
			/>
		</div>

		<ol class="sudoku-grid">
			<li
				:aria-label="`Subgrid ${ subgridIndex + 1 }`"
				v-for="(subgrid, subgridIndex) in subgrids" :key="`subgrid-${ subgridIndex }`"
			>
				<ol class="sudoku-subgrid">
					<li
						v-for="(cell, cellIndex) in subgrid" :key="`cell-${ cellIndex }`">
						<cell
							@active="setCellActive"
							:isActive="activeRow === cell.row && activeCol === cell.col"
							:isInvalid="$store.state.displayErrors && (cell.value && isCellInvalid(cell.row, cell.col, cell.value))"
							:isOriginal="cell.original"
							:isPeerCell="$store.state.displayPeerCells && (activeRow === cell.row || activeCol === cell.col || activeSubgrid === cell.subgrid)"
							:isPeerDigit="$store.state.displayPeerDigits && (activeValue !== -1 && activeValue === cell.value)"
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
import Cell from './../../components/Cell';
import Timer from './../../components/Timer';

export default {
	name: 'Sudoku',

	components: {
		Cell,
		Timer,
	},

	data() {
		return {
			activeRow: -1,
			activeSubgrid: -1,
			activeCol: -1,
			activeValue: -1,
			isNotesMode: false,
			activeIsOriginal: false,
		};
	},

	computed: {
		cells() {
			const cells = Array(81);

			for (let r = 0; r < 9; r += 1) {
				for (let c = 0; c < 9; c += 1) {
					cells[(r * 9) + c] = this.$store.state.puzzle[r][c];
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
			return this.$store.state.puzzle;
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
		// generatePuzzle() {
		// 	this.$store.commit('reset');
		// 	this.$store.dispatch('stopTimer');
		// 	this.$store.dispatch('startTimer');
		// },

		pausePuzzle() {
			this.$store.dispatch('pauseTimer');
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
			this.$store.commit('clearCellNotes', {
				row: this.activeRow,
				col: this.activeCol,
			});
			this.$store.commit('setCellValue', {
				row: this.activeRow,
				col: this.activeCol,
				value,
			});
		},

		setCellNote(value) {
			if (!this.original) {
				if (this.$store.state.puzzle[this.activeRow][this.activeCol].value > 0) {
					this.$store.commit('clearCellValue', {
						row: this.activeRow,
						col: this.activeCol,
					});
				}

				this.$store.commit('setCellNote', {
					row: this.activeRow,
					col: this.activeCol,
					value,
				});
			}
		},

		clearCell() {
			this.$store.commit('clearCellValue', {
				row: this.activeRow,
				col: this.activeCol,
			});
			this.$store.commit('clearCellNotes', {
				row: this.activeRow,
				col: this.activeCol,
			});
		},

		isCellInvalid(row, col, value) {
			if (!value) {
				return true;
			}

			for (let c = 0; c < 9; c += 1) {
				if (this.$store.state.puzzle[row][c].value === value && c !== col) {
					return true;
				}
			}

			for (let r = 0; r < 9; r += 1) {
				if (this.$store.state.puzzle[r][col].value === value && r !== row) {
					return true;
				}
			}

			const rowStart = Math.floor(row / 3) * 3;
			const colStart = Math.floor(col / 3) * 3;

			for (let r = rowStart; r < rowStart + 3; r += 1) {
				for (let c = colStart; c < colStart + 3; c += 1) {
					if (
						this.$store.state.puzzle[r][c].value === value &&
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
					if (this.isCellInvalid(r, c, this.$store.state.puzzle[r][c].value)) {
						return false;
					}
				}
			}
			return true;
		},
	},

	mounted() {
		this.$store.dispatch('startTimer');
	},
};
</script>

<style lang="scss">
@import "~scss-mixins-functions-variables/scss/reset/list/reset-list-mixins";

.sudoku-grid {
	--bg: #fffffe;
	--type: #111;
	--highlight: lightskyblue;

	@include reset-list;

	display: grid;
	grid-gap: 2px;
	grid-template-columns: repeat(3, 1fr);
	position: relative;
	z-index: 0;

	&::before {
		background: var(--type);
		bottom: 0;
		content: "";
		left: 0;
		opacity: 0.65;
		position: absolute;
		right: 0;
		top: 0;
		z-index: -1;
	}
}

.sudoku-subgrid {
	@include reset-list;

	background: var(--bg);
	display: grid;
	grid-gap: 1px;
	grid-template-columns: repeat(3, 1fr);
	position: relative;

	&::before {
		background: var(--type);
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
	}
}

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
