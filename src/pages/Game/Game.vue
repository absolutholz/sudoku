<template>
	<div class="l-page-container">
		<h1>Game</h1>

		<nav>
			<router-link to="/">Home</router-link>
			<span>New Game</span>
			<button @click="restartGame">Restart</button>
			<router-link to="/settings">Settings</router-link>
		</nav>

		<!-- <div>{{ $store.state.difficulty }}</div> -->

		<timer-display
			:seconds="$store.state.seconds"
			@pause="pauseGame"
		/>

		<sudoku />
	</div>
</template>

<script>
import TimerDisplay from './../../components/TimerDisplay';
import Sudoku from './../../components/Sudoku';

export default {
	name: 'GamePage',

	components: {
		Sudoku,
		TimerDisplay,
	},

	beforeRouteLeave (to, from, next) {
		this.$store.dispatch('pauseGame');
		next();
	},

	methods: {
		pauseGame() {
			this.$store.dispatch('pauseGame');
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
	},
};
</script>
