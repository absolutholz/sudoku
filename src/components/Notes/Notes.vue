<template>
	<ol class="notes">
		<li
			v-for="value in Array(9).keys()" :key="`note-${value}`"
		>
			<span
				class="note"
				v-if="notes[value]"
			>{{ value + 1 }}</span>
		</li>
	</ol>
</template>

<script>
export default {
	name: "Notes",

	props: {
		notes: {
			default: function () {
				return Array(9);
			},
			required: false,
			type: Array,
		},
	},
};
</script>

<style lang="scss">
@import "~scss-mixins-functions-variables/scss/reset/list/reset-list-mixins";

.notes {
	@include reset-list;

	display: grid;
	font-size: 0.3em;
	grid-template-columns: repeat(3, 1fr);
	padding: 0.2em;
	pointer-events: none;

	height: 100%;
	left: 0;
	position: absolute;
	top: 0;
	width: 100%;

	@media (min-width: 375px) {
		// font-size: 0.4em;
	}

	> * {
		padding-bottom: 100%;
		position: relative;

		> * {
			height: 100%;
			left: 0;
			position: absolute;
			top: 0;
			width: 100%;
		}
	}
}

.note {
    align-items: center;
    display: flex;
    justify-content: center;
}
</style>
