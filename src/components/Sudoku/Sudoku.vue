<template>
	<div>
		<div class="sudoku-gameboard">

			<div
				class="sudoku-overlay"
				@click="resumeGame"
				v-if="$store.state.isPaused"
			>
				<svg-pause class="icon" />
			</div>

			<ol class="sudoku-grid">
				<li
					:aria-label="`Subgrid ${ subgridIndex + 1 }`"
					v-for="(subgrid, subgridIndex) in subgrids" :key="`subgrid-${ subgridIndex }`"
				>
					<ol class="sudoku-subgrid">
						<li
							v-for="(cell, cellIndex) in subgrid" :key="`cell-${ cellIndex }`">
							<sudoku-cell
								:activeDigit="activeValue"
								@active="setCellActive"
								:isActive="activeRow === cell.row && activeCol === cell.col"
								:isInvalid="$store.state.displayErrors && (cell.value && isCellInvalid(cell.row, cell.col, cell.value))"
								:isOriginal="cell.original"
								:isPeerCell="$store.state.displayPeerCells && (activeRow === cell.row || activeCol === cell.col || activeSubgrid === cell.subgrid)"
								:isPeerDigit="$store.state.displayPeerDigits && (activeValue !== -1 && activeValue === cell.value)"
								:row="cell.row"
								:col="cell.col"
								:subgrid="cell.subgrid"
								:digit="cell.value"
								:notes="cell.notes"
							>
								<template>{{ cell.value }}</template>
							</sudoku-cell>
						</li>
					</ol>
				</li>
			</ol>
		</div>

		<div class="sudoku-controls">
			<div class="sudoku-controls__section--cell-controls">
				<ol class="btn-grid">
					<li
						v-for="value in Array(9).keys()"
						:key="`entry-${value}`"
					>
						<sudoku-digit-button
							:disabled="isActiveCellLocked"
							@interact="isNotesMode ? setCellNote(value + 1) : setCellValue(value + 1)"
						>{{ value + 1 }}</sudoku-digit-button>
					</li>
					<li>
						<sudoku-icon-button
							:disabled="isActiveCellLocked"
							@interact="clearCell"
						><template #icon><svg-eraser class="icon" /></template>Erase</sudoku-icon-button>
					</li>
				</ol>
			</div>

			<div class="sudoku-controls__section--board-controls">
				<label
					class="btn btn--with-switch"
					for="note-switch-button"
					@mousedown.prevent="toggleNotesMode"
				>
					<switch-button
						id="note-switch-button"
						:state="isNotesMode"
					/>
					<span>Notes</span>
				</label>
			</div>
		</div>
	</div>
</template>

<script>
import SudokuCell from './../SudokuCell';
import SudokuDigitButton from './../SudokuDigitButton';
import SudokuIconButton from './../SudokuIconButton';
import SwitchButton from './../SwitchButton';

import SvgEraser from '@mdi/svg/svg/eraser.svg';
import SvgPause from '@mdi/svg/svg/pause.svg';

export default {
	name: 'Sudoku',

	components: {
		SudokuCell,
		SudokuDigitButton,
		SudokuIconButton,
		SwitchButton,
		SvgEraser,
		SvgPause,
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

		isActiveCellLocked () {
			return !!(this.activeIsOriginal || this.activeRow === -1 || this.activeCol === -1);
		},
	},

	methods: {
		resumeGame () {
			this.$store.dispatch('resumeGame');
		},

		toggleNotesMode() {
			this.isNotesMode = !this.isNotesMode;
		},

		setCellActive(row, col, subgrid, value, original) {
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
			console.log(value);
			if (this.isActiveCellLocked) {
				return;
			}

			this.$store.commit('clearCellNotes', {
				row: this.activeRow,
				col: this.activeCol,
			});
			this.$store.commit('setCellValue', {
				row: this.activeRow,
				col: this.activeCol,
				value,
			});
			this.activeValue = value || -1;

			if (this.isGameComplete()) {
				this.$store.commit('setCompletedState', { isComplete: true });
				this.$store.dispatch('stopGame');
			}
		},

		setCellNote(value) {
			console.log(value);
			if (this.isActiveCellLocked) {
				return;
			}

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
			if (this.isActiveCellLocked) {
				return;
			}

			this.$store.commit('clearCellValue', {
				row: this.activeRow,
				col: this.activeCol,
			});
			this.$store.commit('clearCellNotes', {
				row: this.activeRow,
				col: this.activeCol,
			});
			this.activeValue = -1;
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
		// this.$store.dispatch('startTimer');
	},
};
</script>

<style lang="scss">
@import "~scss-mixins-functions-variables/scss/reset/list/reset-list-mixins";

.sudoku-gameboard {
	position: relative;
}

.sudoku-overlay {
	align-items: center;
	bottom: 0;
	display: flex;
	justify-content: center;
	left: 0;
	position: absolute;
	right: 0;
	top: 0;
	z-index: 1;

	&::before {
		backdrop-filter: blur(0.25em);
		background: unquote("hsl(var(--bg-hue), var(--bg-sat), var(--bg-lum), 0.5)");
		bottom: 0;
		content: "";
		left: 0;
		position: absolute;
		right: 0;
		top: 0;
	}

	.icon {
		font-size: 6rem;
		z-index: 1;
	}
}

.sudoku-controls {
	&__section {
		display: flex;
		justify-content: center;
		margin-bottom: 1rem;
		margin-top: 1rem;

		&--cell-controls {
			@extend .sudoku-controls__section;

		}

		&--board-controls {
			@extend .sudoku-controls__section;

		}
	}
}

.sudoku-grid {
	@include reset-list;

	display: grid;
	grid-gap: 2px;
	grid-template-columns: repeat(3, 1fr);
	position: relative;
	z-index: 0;

	&::before {
		background: var(--typo);
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
		background: var(--typo);
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
</style>
