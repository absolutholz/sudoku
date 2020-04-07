<template>
	<btn
		class="btn--icon-text"
		@click="onInteract"
		variant="outlined"
	>
		<slot name="icon" />
		<span><slot /></span>
	</btn>
</template>

<script>
import Btn from './../Btn';

export default {
	name: 'SudokuIconButton',

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
.btn--icon-text {
	// flex-direction: column;
	// font-size: 0.875rem;

	.icon {
		font-size: 1.5em;
		height: 1em;
		margin: 0 0.25em;
		vertical-align: bottom;
		width: 1em;

		&:first-child {
			margin-left: 0;
		}

		&:last-child {
			margin-right: 0;
		}
	}
}
</style>
