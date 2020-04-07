<template>
	<div class="l-game">
		<nav class="site-head site-head--portrait">
			<div class="site-head__location">
				<router-link to="/"><svg-home aria-label="Home" class="icon" /></router-link>
			</div>

			<div class="site-head__settings">
				<router-link to="/settings"><svg-cog aria-label="Settings" class="icon" /></router-link>
			</div>
		</nav>

		<div class="l-game__board sudoku-gameboard">

			<game-overlay
				@click="resumeGame"
				variant="game-paused"
				v-if="$store.state.isPaused && !isGameComplete()"
			>
				<svg-pause class="icon" />
			</game-overlay>

			<game-overlay
				variant="game-over"
				v-if="isGameComplete()"
			>
				<div>You won!</div>
				<btn variant="contained" @click="startNewGame()">New {{ difficultyLevel }} Game</btn>
			</game-overlay>

			<ol class="sudoku-grid">
				<li
					:aria-label="`Subgrid ${ subgridIndex + 1 }`"
					v-for="(subgrid, subgridIndex) in subgrids" :key="`subgrid-${ subgridIndex }`"
				>
					<ol class="sudoku-subgrid">
						<li
							class="sudoku-cell"
							v-for="(cell, cellIndex) in subgrid" :key="`cell-${ cellIndex }`"
						>
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
								<template><cell-number>{{ cell.value }}</cell-number></template>
							</sudoku-cell>
						</li>
					</ol>
				</li>
			</ol>
		</div>

		<div class="l-game__controls">
			<nav class="site-head site-head--landscape">
				<div class="site-head__location">
					<router-link to="/"><svg-home aria-label="Home" class="icon" /></router-link>
				</div>

				<div class="site-head__settings">
					<router-link to="/settings"><svg-cog aria-label="Settings" class="icon" /></router-link>
				</div>
			</nav>

			<div>
				<div class="sudoku-meta">
					<span>{{ difficultyLevel }}</span>
					<div>
						<timer-display :seconds="$store.state.seconds" />
						<button aria-title="Pause game" @click="pauseGame"><svg-pause class="icon" /></button>
						<button aria-title="Restart game" @click="restartGame"><svg-restart class="icon" /></button>
					</div>
				</div>

				<div class="sudoku-controls">
						<ol class="cell-controls">
							<li
								v-for="value in Array(9).keys()"
								:key="`entry-${value}`"
							>
								<sudoku-digit-button
									:disabled="isActiveCellLocked"
									@interact="isNotesMode ? setCellNote(value + 1) : setCellValue(value + 1)"
								>{{ value + 1 }}</sudoku-digit-button>
							</li>
							<li class="cell-controls__span">
								<sudoku-icon-button
									:disabled="isActiveCellLocked"
									@interact="clearCell"
								><template #icon><svg-eraser class="icon" /></template>Erase</sudoku-icon-button>
							</li>
						</ol>

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

						<!-- <label
							class="btn btn--with-switch"
							for="num-lock-switch-button"
							@mousedown.prevent="toggleNumLockMode"
						>
							<switch-button
								id="num-lock-switch-button"
								:state="isNumLockMode"
							/>
							<span>Num lock</span>
						</label> -->
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import difficultyLevels from './../../difficulty-levels';

import SudokuCell from './../SudokuCell';
import SudokuDigitButton from './../SudokuDigitButton';
import SudokuIconButton from './../SudokuIconButton';
import SwitchButton from './../SwitchButton';
import CellNumber from './../CellNumber';
import TimerDisplay from './../../components/TimerDisplay';
import Btn from './../../components/Btn';
import GameOverlay from './../../components/GameOverlay';

import SvgEraser from '@mdi/svg/svg/eraser.svg';
import SvgPause from '@mdi/svg/svg/pause.svg';
import SvgRestart from '@mdi/svg/svg/restart.svg';
import SvgHome from '@mdi/svg/svg/home.svg';
import SvgCog from '@mdi/svg/svg/cog.svg';
// import SvgBrush from '@mdi/svg/svg/brush.svg';

export default {
	name: 'Sudoku',

	components: {
		Btn,
		GameOverlay,
		SudokuCell,
		SudokuDigitButton,
		SudokuIconButton,
		SwitchButton,
		TimerDisplay,
		CellNumber,
		SvgEraser,
		SvgPause,
		SvgRestart,
		SvgHome,
		SvgCog,
		// SvgBrush,
	},

	data() {
		return {
			activeRow: -1,
			activeSubgrid: -1,
			activeCol: -1,
			activeValue: -1,
			isNotesMode: false,
			isNumLockMode: false,
			activeIsOriginal: false,
		};
	},

	computed: {
		difficultyLevel () {
			return difficultyLevels[this.$store.state.difficulty];
		},

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
		pauseGame() {
			this.$store.dispatch('pauseGame');
		},

		resumeGame () {
			this.$store.dispatch('resumeGame');
		},

		startNewGame () {
			this.$store.commit("generatePuzzle", { difficulty: this.$store.state.difficulty });
			this.$store.dispatch("startGame");
		},

		restartGame() {
			this.$store.state.puzzle.forEach(row => {
				row.forEach(cell => {
					if (!cell.original) {
						this.$store.commit('clearCellNotes', {
							row: cell.row,
							col: cell.col,
						});

						this.$store.commit('clearCellValue', {
							row: cell.row,
							col: cell.col,
						});
					}
				});
			});
			this.$store.dispatch('startGame');
		},

		toggleNotesMode() {
			this.isNotesMode = !this.isNotesMode;
		},

		toggleNumLockMode() {
			this.isNumLockMode = !this.isNumLockMode;
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
@import "./../../scss/color.functions";

$spacing: 2vw;

.site-head {
	display: flex;
	justify-content: space-between;
	width: 100%;

	a {
		color: inherit;
		display: inline-block;
	}

	.icon {
		font-size: 2.5rem;
		padding: 0.25em;
	}

	&--landscape {
		border-bottom: 1px solid;
		margin: 1vw 0;

		@media (orientation: portrait) {
			display: none;
		}
	}

	&--portrait {
		margin: $spacing;

		@media (orientation: landscape) {
			display: none;
		}
	}
}

.l-game {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;

	&__board {
		margin: $spacing;
		max-width: calc(100vh - #{ $spacing * 2 });
		width: 100%;
	}

	&__controls {
		flex-grow: 1;
		padding: $spacing;

		@media (orientation: landscape) {
			padding-bottom: 0;
			padding-top: 0;
			max-width: 20rem;
		}
	}
}

.cell-controls {
	@include reset-list;

    display: grid;
    grid-gap: 1rem;
	grid-template-columns: repeat(3, 1fr);

	> li,
	.btn {
		text-align: center;
		width: 100%;
	}

	&__span {
		grid-column: 1 / span 3;
	}
}


.sudoku-gameboard {
	font-size: 1.5em;
	position: relative;
}

.sudoku-controls {
	@media (min-height: 800px) {
		font-size: 2rem;
	}

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

.sudoku-meta {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	margin-bottom: 1rem;
}

// .sudoku-grid {
// 	@include reset-list;

// 	display: grid;
// 	grid-gap: 2px;
// 	grid-template-columns: repeat(3, 1fr);
// 	position: relative;
// 	z-index: 0;

// 	&::before {
// 		background: var(--typo);
// 		bottom: 0;
// 		content: "";
// 		left: 0;
// 		opacity: 0.65;
// 		position: absolute;
// 		right: 0;
// 		top: 0;
// 		z-index: -1;
// 	}
// }

// .sudoku-subgrid {
// 	@include reset-list;

// 	background: var(--bg);
// 	display: grid;
// 	grid-gap: 1px;
// 	grid-template-columns: repeat(3, 1fr);
// 	position: relative;

// 	&::before {
// 		background: var(--typo);
// 		bottom: 0;
// 		content: "";
// 		left: 0;
// 		opacity: 0.25;
// 		position: absolute;
// 		right: 0;
// 		top: 0;
// 	}

// 	> * {
// 		background: white;
// 		padding-bottom: 100%;
// 		position: relative;
// 	}
// }

.sudoku-grid,
.sudoku-subgrid {
	@include reset-list;

	display: grid;
	grid-template-columns: repeat(3, 1fr);
}

.sudoku-grid {
	$border-width: 3px;

	grid-gap: $border-width;

	> li {
		&:not(:nth-child(3n)) {
			position: relative;

			&::before {
				border-left: $border-width solid css-hsla(var(--color), 0.5);
				content: "";
				display: block;
				height: 100%;
				left: 100%;
				position: absolute;
				top: 0;
				width: $border-width;
			}
		}

		&:not(:nth-last-child(-n + 3)) {
			position: relative;

			&::after {
				border-bottom: $border-width solid css-hsla(var(--color), 0.5);
				content: "";
				display: block;
				height: $border-width;
				left: 0;
				position: absolute;
				top: 100%;
				width: 100%;
			}
		}

		// &:nth-child(3n - 1),
		// &:nth-child(3n - 2) {
		// 	&::before {
		// 		border-left: 1px solid;
		// 		content: "";
		// 		display: block;
		// 		height: 100%;
		// 		right: 0;
		// 		position: absolute;
		// 		top: 0;
		// 	}
		// }
	}

	// &:nth-child(-n + 3),
	// &:nth-child(-n + 6) {
	// 	background: blue;
	// }


	// border: 1px solid css-hsla(var(--color), 0.65);

	// > li {
	// 	border: inherit;
	// }

	// $percentage: 100% / 9;
	// background: repeating-linear-gradient(to right, transparent, transparent calc(#{$percentage} - 1px), white calc(#{$percentage} - 1px), transparent $percentage),
	// 	repeating-linear-gradient(to bottom, transparent, transparent calc(#{$percentage} - 1px), white calc(#{$percentage} - 1px), transparent $percentage);
}

.sudoku-subgrid {
	// border: 3px solid transparent;

	// &:nth-child(3n - 1),
	// &:nth-child(3n - 2) {
	// 	border-right-color: css-hsla(var(--color), 0.65);
	// }

	// &:nth-child(-n + 3),
	// &:nth-child(-n + 6) {
	// 	border-bottom-color: css-hsla(var(--color), 0.65);
	// }

	$border-width: 1px;

	grid-gap: $border-width;

	> li {

		&:not(:nth-child(3n)) {
			position: relative;

			&::before {
				border-left: $border-width solid css-hsla(var(--color), 0.75);
				content: "";
				display: block;
				height: 100%;
				left: 100%;
				position: absolute;
				top: 0;
				width: $border-width;
			}
		}

		&:not(:nth-last-child(-n + 3)) {
			position: relative;

			&::after {
				border-bottom: $border-width solid css-hsla(var(--color), 0.75);
				content: "";
				display: block;
				height: $border-width;
				left: 0;
				position: absolute;
				top: 100%;
				width: 100%;
			}
		}

		// border: 0 solid css-hsla(var(--color), 0.45);

		// &:nth-child(3n - 1),
		// &:nth-child(3n - 2) {
		// 	border-right-width: 1px;
		// }

		// &:nth-child(-n + 3),
		// &:nth-child(-n + 6) {
		// 	border-bottom-width: 1px;
		// }
	}
}

.sudoku-cell {
	// border: 1px solid transparent;
	padding-bottom: 100%;
	position: relative;

	// &:nth-child(3n - 1),
	// &:nth-child(3n - 2) {
	// 	border-right-color: css-hsla(var(--color), 0.45);
	// }

	// &:nth-child(-n + 3),
	// &:nth-child(-n + 6) {
	// 	border-bottom-color: css-hsla(var(--color), 0.45);
	// }

	// > * {
	// 	height: 100%;
	// 	left: 0;
	// 	position: absolute;
	// 	top: 0;
	// 	width: 100%;
	// }
}
</style>
