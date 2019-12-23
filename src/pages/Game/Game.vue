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
};
</script>
