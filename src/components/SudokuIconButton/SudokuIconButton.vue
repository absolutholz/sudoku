<template>
	<btn
		class="btn--icon-text"
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
