<template>
	<div class="sudoku">
		<div class="row">
			<h2>Sudoku</h2>

			<strong>{{ formattedTime }}</strong>

			<select
				@change="generatePuzzle()"
				v-model="difficulty"
			>
				<option
					v-for="(display, level) in levels" :key="level"
					:value="level"
				>
					{{ display }}
				</option>
			</select>
		</div>

		<div class="grid">
			<div class="row" v-for="(row, rowIndex) in puzzle" :key="rowIndex">
				<div
					class="cell" :class="{
						'border-right' : colIndex === 2 || colIndex === 5,
						'border-bottom' : rowIndex === 2 || rowIndex === 5,
						'original': cell.original,
						'active': activeRow === rowIndex && activeCol === colIndex,
						'invalid': cell.value && isCellInvalid(rowIndex, colIndex, cell.value),
					}"
					v-for="(cell, colIndex) in row"
					:key="colIndex"
					@click="setCellActive(rowIndex, colIndex, cell.original)"
				>
				{{ cell.value }}
				</div>
			</div>
		</div>

		<div class="row">
			<button
				class="btn"
				@click="setCellValue(value + 1)"
				:disabled="activeRow === -1 || activeCol === -1"
				type="button"
				v-for="value in Array(9).keys()" :key="value"
			>
				{{ value + 1 }}
			</button>
		</div>
	</div>
</template>

<script>
import { sudoku } from "sudoku.js/sudoku.js";

export default {
	name: "Sudoku",

	data() {
		return {
			puzzle: [],
			difficulty: "easy",
			activeRow: -1,
			activeCol: -1,
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
		};
	},

	mounted() {
		this.generatePuzzle();
	},

	computed: {
		formattedTime () {
			const min = Math.floor(this.seconds / 60);
			const sec = this.seconds % 60;

			return `${min > 9 ? min : `0${min}`}:${sec > 9 ? sec: `0${sec}`}`
		},
	},

	methods: {
		generatePuzzle() {
			const boardString = sudoku.generate(this.difficulty);
			this.puzzle = sudoku.board_string_to_grid(boardString)
				.map(row => {
					return row.map(cell => {
						return {
							value: cell !== '.' ? parseInt(cell) : null,
							original: cell !== '.',
						}
					});
				});
			// console.log(boardString);
			// console.log(this.puzzle);

			this.seconds = 0;
			clearInterval(this.timer);
			this.timer = setInterval(() => {
				this.seconds += 1;
			}, 1000);
		},

		setCellActive (row, col, original) {
			if (original) {
				return;
			}

			if (this.activeRow === row && this.activeCol === col) {
				this.activeRow = -1;
				this.activeCol = -1;
				return;
			}

			this.activeRow = row;
			this.activeCol = col;
			return;
		},

		setCellValue (value) {
			this.puzzle[this.activeRow][this.activeCol].value = value;
			this.activeRow = -1;
			this.activeCol = -1;

			if (this.isGameComplete()) {
				const msg = [
					'Success!',
					'\n'
					`Difficulty: ${ this.levels[ this.difficulty ] }`,
					`Time: ${ this.formattedTime }`,
				]

				alert(msg.join('\n'));
				this.generatePuzzle();
			}
		},

		isCellInvalid (row, col, value) {
			if (!value) {
				return true;
			}

			for(let c = 0; c < 9; c += 1) {
				if (this.puzzle[row][c].value === value && c !== col) {
					return true;
				}
			}

			for(let r = 0; r < 9; r += 1) {
				if (this.puzzle[r][col].value === value && r !== row) {
					return true;
				}
			}

			const rowStart = Math.floor(row / 3) * 3;
			const colStart = Math.floor(col / 3) * 3;

			for (let r = rowStart; r < rowStart + 3; r += 1) {
				for (let c = colStart; c < colStart + 3; c += 1) {
					if (this.puzzle[r][c].value === value && !(r === row && c === col)) {
						return true;
					}
				}
			}

			return false;
		},

		isGameComplete () {
			for (let r = 0; r < 9; r += 1) {
				for (let c = 0; c < 9; c += 1) {
					if ( this.isCellInvalid(r, c, this.puzzle[r][c].value)) {
						return false;
					}
				}
			}
			return true;
		},
	},
};
</script>

<style>
.sudoku {
	max-width: 420px;
}

.row {
	align-items: center;
	display: flex;
	justify-content: space-between;
}

.grid {
	margin: 0.5rem auto 1rem;
	width: 360px;
}

.cell {
	border: 1px solid #bbb;
	box-sizing: border-box;
	cursor: pointer;
	display: block;
	font-size: 24px;
	line-height: 40px;
	height: 40px;
	text-align: center;
	width: 40px;
}

.cell.border-right {
	border-right-width: 3px;
}

.cell.border-bottom {
	border-bottom-width: 3px;
}

.cell.original {
	cursor: default;
	font-weight: bold;
}

.cell.active {
	background: dodgerblue;
	color: white;
}

.cell.invalid:not(.active) {
	background: firebrick;
	color: white;
}

.btn {
	cursor: pointer;
	height: 38px;
	width: 38px;
}

.btn:disabled {
	cursor: not-allowed;
}
</style>
