import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';

import { sudoku } from 'sudoku.js/sudoku.js';

Vue.use(Vuex);

let timer = null;

const store = new Vuex.Store({
	state: {
		puzzle: [],
		seconds: 0,
	},

	mutations: {
		increment (state, payload) {
			state.seconds += payload.amount;
		},

		reset (state) {
			state.seconds = 0;
		},

		setCellValue (state, { row, col, value }) {
			state.puzzle[row][col].value = value;
		},

		clearCellValue (state, { row, col }) {
			state.puzzle[row][col].value = null;
		},

		setCellNote (state, { row, col, value }) {
			state.puzzle[row][col].notes.splice(value - 1, 1, !state.puzzle[row][col].notes[value - 1]);
		},

		clearCellNotes (state, { row, col }) {
			state.puzzle[row][col].notes = [false, false, false, false, false, false, false, false, false];
		},

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
		startTimer ({ commit }) {
			timer = setInterval(() => {
				commit('increment', {
					amount: 1,
				});
			}, 1000);
		},

		stopTimer () {
			clearInterval(timer);
			timer = null;
		},

		pauseTimer({ dispatch }) {
			if (timer) {
				dispatch('stopTimer');
			} else {
				dispatch('startTimer');
			}
		},
	},

	plugins: [new VuexPersistence().plugin],
});

export default store;
