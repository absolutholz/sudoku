<template>
	<div>
		<h1>Game</h1>

		<sudoku />
	</div>
</template>

<script>
import Sudoku from './../../components/Sudoku';

export default {
	name: 'GamePage',

	components: {
		Sudoku,
	},

	beforeRouteLeave (to, from, next) {
		this.$store.dispatch('pauseTimer');
		next();
	},
};
</script>
