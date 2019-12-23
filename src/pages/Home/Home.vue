<template>
	<div>
		<h1>Sudoku</h1>
		<form @submit.prevent="selectDifficulty()">

			<fieldset>
				<legend>Difficulty</legend>

				<label
					v-for="(display, level) in levels" :key="`difficulty-level-${ level }`"
				>
					<input
						checked="level === difficulty"
						:id="`difficulty-level-${ level }`"
						name="difficulty-level"
						type="radio"
						:value="level"
						v-model="difficulty"
					>{{ display }}
				</label>
			</fieldset>

			<button
				:disabled="!difficulty"
				type="submit"
			>Start</button>
		</form>
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
		selectDifficulty() {
			this.$router.push({
				name: 'game',
				params: {
					difficulty: this.difficulty,
				},
			});
		},
	},
};
</script>
