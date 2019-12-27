<template>
	<div class="l-page-container">
		<h1>Game</h1>

		<nav>
			<router-link to="/">Home</router-link>
			<router-link to="/settings">Settings</router-link>
		</nav>

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
