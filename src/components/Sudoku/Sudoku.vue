<template>
	<div class="sudoku">
		<ol class="sudoku-grid">
			<li
				:aria-label="`Subgrid ${ subgridIndex + 1 }`"
				v-for="(subgrid, subgridIndex) in subgrids" :key="`subgrid-${ subgridIndex }`"
			>
				<ol class="sudoku-subgrid">
					<li
						v-for="(cell, cellIndex) in subgrid" :key="`cell-${ cellIndex }`">
						<cell
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
			><svg-eraser class="icon" /></button>
		</div>

		<div class="row">
			<button
				@mousedown.prevent="toggleNotesMode"
			><svg-pencil class="icon" /></button>
		</div>
	</div>
</template>

<script>
import Cell from './../../components/Cell';

import SvgEraser from '@mdi/svg/svg/eraser.svg';
import SvgPencil from '@mdi/svg/svg/pencil.svg';

export default {
	name: 'Sudoku',

	components: {
		Cell,
		SvgEraser,
		SvgPencil,
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
			this.activeValue = value || -1;
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

.btn {
	cursor: pointer;
	height: 38px;
	width: 38px;

	&:disabled {
		cursor: not-allowed;
	}
}
</style>
