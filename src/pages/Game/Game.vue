<template>
	<div class="l-page-container">
		<h1>Game</h1>

		<nav>
			<router-link to="/">Home</router-link>
			<router-link to="/settings">Settings</router-link>
		</nav>

		<!-- <div>{{ $store.state.difficulty }}</div> -->

		<timer
			:seconds="$store.state.seconds"
			@pause="pauseGame"
		/>

		<sudoku />
	</div>
</template>

<script>
import Timer from './../../components/Timer';
import Sudoku from './../../components/Sudoku';

export default {
	name: 'GamePage',

	components: {
		Sudoku,
		Timer,
	},

	beforeRouteLeave (to, from, next) {
		this.$store.dispatch('pauseGame');
		next();
	},

	methods: {
		pauseGame() {
			this.$store.dispatch('pauseGame');
		},
	},
};
</script>
