import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';

import { sudoku } from 'sudoku.js/sudoku.js';

Vue.use(Vuex);

let timer = null;
const stopTimer = function stopTimingIntervalAndSetToNull () {
	clearInterval(timer);
	timer = null;
};

const store = new Vuex.Store({
	state: {
		difficulty: 'easy',
		puzzle: [],
		seconds: 0,
		displayPeerCells: true,
		displayPeerDigits: true,
		displayErrors: true,
		isPaused: true,
	},

	mutations: {
		// Settings
		setDisplayPeerCells (state, { desiredState }) {
			state.displayPeerCells = !!desiredState;
		},

		setDisplayPeerDigits (state, { desiredState }) {
			state.displayPeerDigits = !!desiredState;
		},

		setDisplayErrors (state, { desiredState }) {
			state.displayErrors = !!desiredState;
		},

		// Timer
		incrementTimer (state, { amount }) {
			state.seconds += amount;
		},

		resetTimer (state) {
			state.seconds = 0;
		},

		// Puzzle (Value)
		setCellValue (state, { row, col, value }) {
			state.puzzle[row][col].value = value;
		},

		clearCellValue (state, { row, col }) {
			state.puzzle[row][col].value = null;
		},

		// Puzzle (Notes)
		setCellNote (state, { row, col, value }) {
			state.puzzle[row][col].notes.splice(value - 1, 1, !state.puzzle[row][col].notes[value - 1]);
		},

		clearCellNotes (state, { row, col }) {
			state.puzzle[row][col].notes = [false, false, false, false, false, false, false, false, false];
		},

		// Puzzle
		generatePuzzle (state, { difficulty }) {
			const boardString = sudoku.generate(difficulty);
			state.puzzle = sudoku.board_string_to_grid(boardString).map((row, rowIndex) => {
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
		},
	},

	actions: {
		startGame ({ state, commit }, { difficulty }) {
			commit('resetTimer');

			commit('difficulty', { difficulty });
			commit('generatePuzzle', { difficulty });

			timer = setInterval(() => {
				if (!state.isPaused) {
					commit('incrementTimer', {
						amount: 1,
					});
				}
			}, 1000);
			state.isPaused = false;
		},

		stopGame () {
			stopTimer();
		},

		pauseGame ({ state }) {
			state.isPaused = true;
			stopTimer();
		},

		resumeGame ({ commit, state }) {
			timer = setInterval(() => {
				if (!state.isPaused) {
					commit('incrementTimer', {
						amount: 1,
					});
				}
			}, 1000);
			state.isPaused = false;
		},
	},

	plugins: [new VuexPersistence().plugin],
});

export default store;
