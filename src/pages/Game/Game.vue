<template>
	<div>
		<h1 class="l-visually-hidden">Game</h1>

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
		this.$store.dispatch('pauseGame');
		next();
	},

	methods: {
	},
};
</script>
