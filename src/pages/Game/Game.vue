<template>
	<div>
		<h1>Game</h1>

		<sudoku />

		<!-- <div class="row">
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
		</div> -->
	</div>
</template>

<script>
import Sudoku from './../../components/Sudoku';

export default {
	name: 'GamePage',

	components: {
		Sudoku,
	},
};
</script>
