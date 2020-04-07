<template>
	<btn
		class="btn--digit"
		@click="onInteract"
		variant="outlined"
	><slot /></btn>
</template>

<script>
import Btn from './../Btn';

export default {
	name: 'SudokuDigitButton',

	components: {
		Btn,
	},

	methods: {
		onInteract () {
			this.$emit('interact');
		},
	},
};
</script>

<style lang="scss">
.btn--digit {
	font: 1em / 1 "Rubik", sans-serif;
	padding: 0.5rem 0;
}
</style>
