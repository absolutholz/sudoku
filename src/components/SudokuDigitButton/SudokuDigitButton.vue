<template>
	<btn
		class="btn--digit"
	><slot /></btn>
</template>

<script>
import Btn from './../Btn';

export default {
	name: 'SudokuDigitButton',

	components: {
		Btn,
	},
};
</script>

<style lang="scss">
.btn--digit {
	font: 2rem / 1 "Rubik", sans-serif;
	min-height: 1.5em;
	min-width: 1.5em;
}
</style>
