import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';

import { sudoku } from 'sudoku.js/sudoku.js';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		difficulty: 'easy',
		puzzle: [],
		seconds: 0,
		displayPeerCells: true,
		displayPeerDigits: true,
		displayErrors: true,
		isPaused: true,
		isComplete: false,
		darkMode: false,
		theme: 'purple',
	},

	mutations: {
		// Settings
		setDisplayPeerCells (state, { desiredState = true } = {}) {
			state.displayPeerCells = !!desiredState;
		},

		setDisplayPeerDigits (state, { desiredState = true} = {}) {
			state.displayPeerDigits = !!desiredState;
		},

		setDisplayErrors (state, { desiredState = true } = {}) {
			state.displayErrors = !!desiredState;
		},

		// Timer
		incrementTimer (state, { amount = 1 } = {}) {
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
			state.difficulty = difficulty;
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
			this.isComplete = false;
		},

		setPausedState (state, { isPaused = true } = {}) {
			state.isPaused = isPaused;
		},

		setCompletedState (state, { isComplete = true } = {}) {
			state.isComplete = isComplete;
		},

		setDarkMode (state, { desiredState = true } = {}) {
			state.darkMode = !!desiredState;
		},

		setTheme (state, { theme }) {
			state.theme = theme;
		},
	},

	actions: {
		startGame ({ commit }) {
			commit('resetTimer');
			commit('setPausedState', { isPaused: false });
		},

		stopGame ({ commit }) {
			commit('setPausedState', { isPaused: true });
		},

		pauseGame ({ commit }) {
			commit('setPausedState', { isPaused: true });
		},

		resumeGame ({ commit }) {
			commit('setPausedState', { isPaused: false });
		},
	},

	plugins: [new VuexPersistence().plugin],
});

setInterval(() => {
	if (!store.state.isPaused && !store.state.isComplete) {
		store.commit('incrementTimer');
	}
}, 1000);

export default store;
