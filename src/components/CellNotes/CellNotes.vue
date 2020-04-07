<template>
	<ol class="notes">
		<li
			:aria-hidden="!notes[value]"
			class="note"
			:key="`note-${ value + 1 }`"
			v-for="value in Array(9).keys()"
		>
			<cell-number>{{ value + 1 }}</cell-number>
		</li>
	</ol>
</template>

<script>
import CellNumber from './../CellNumber';

export default {
  name: "CellNotes",

	components: {
		CellNumber,
	},

  props: {
    notes: {
      default: function() {
        return Array(9);
      },
      required: false,
      type: Array
	},

    activeDigit: {
      default: -1,
      required: false,
      type: Number
    }
  }
};
</script>

<style lang="scss">
@import "~scss-mixins-functions-variables/scss/reset/list/reset-list-mixins";
@import "./../../scss/color.functions";

.notes {
	@include reset-list;

	color: css-hsl(var(--color));
	display: grid;
	font-size: 0.5em;
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
	font-size: 2em;
	justify-content: center;

	&--active {
		font-weight: bold;
	}

	&[aria-hidden="true"] {
		visibility: hidden;
	}
}
</style>
