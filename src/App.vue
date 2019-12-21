<template>
	<div id="app">
		<sudoku />
	</div>
</template>

<script>
import Sudoku from './components/Sudoku';

export default {
	name: 'app',

	components: {
		Sudoku,
	},
};
</script>

<style lang="scss">
@import "~semantic-reboot/src/reboot";
</style>
