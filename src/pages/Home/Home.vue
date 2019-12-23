<template>
	<div>
		<h1>Sudoku</h1>

		<div v-if="$store.state.puzzle.length">
			<button
				@click="resumeGame()"
			>Resume game</button>
		</div>

		<div>
			Start a new game
			<div v-for="(display, level) in levels" :key="`difficulty-level-${ level }`">
				<button
					@click="startNewGame(level)"
				>{{ display }}</button>
			</div>
		</div>

		<div>
			<router-link to="/settings">Settings</router-link>
		</div>

	</div>
</template>

<script>
export default {
	name: 'HomePage',

	data() {
		return {
			difficulty: false,
			levels: {
				'easy': 'Easy',
				'medium': 'Medium',
				'hard': 'Hard',
				'very-hard': 'Very Hard',
				'insane': 'Insane',
				'inhuman': 'Inhuman',
			},
		};
	},

	methods: {
		startNewGame (difficulty) {
			this.$store.commit('generatePuzzle', { difficulty });

			this.$router.push({
				name: 'game',
			});
		},

		resumeGame () {
			this.$router.push({
				name: 'game',
			});
		},
	},
};
</script>
