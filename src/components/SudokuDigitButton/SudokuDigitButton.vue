<template>
	<button
		class="btn btn--digit"
		@click="onInteract"
	><slot /></button>
</template>

<script>
export default {
	name: 'SudokuDigitButton',

	methods: {
		onInteract () {
			this.$emit('interact');
		},
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
