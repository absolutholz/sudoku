<template>
	<button
		class="btn btn--icon-text"
		@click="onInteract"
	>
		<slot name="icon" />
		<span><slot /></span>
	</button>
</template>

<script>
export default {
	name: 'SudokuIconButton',

	methods: {
		onInteract () {
			this.$emit('interact');
		},
	},
};
</script>

<style lang="scss">
.btn--icon-text {
	flex-direction: column;
	font-size: 0.875rem;

	.icon {
		font-size: 1.5rem;
	}
}
</style>
