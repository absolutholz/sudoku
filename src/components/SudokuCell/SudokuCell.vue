<template>
	<div
		:aria-label="`Subgrid ${ subgrid + 1 }, row ${ row + 1 }, column ${ col + 1 }`"
		class="cell"
		:class="{
			'cell--active': isActive,
			'cell--peer-cell': isPeerCell,
			'cell--original': isOriginal,
			'cell--invalid': isInvalid,
			'cell--peer-digit': isPeerDigit,
		}"
		:id="`cell-${subgrid}x${row}x${col}`"
	>
		<button
			class="cell__content"
			@focus="setActive"
			:readonly="isOriginal"
		>
			<slot>{{ digit }}</slot>
		</button>
		<cell-notes
			:activeDigit="activeDigit"
			:notes="notes"
			v-if="hasNotes"
		/>
	</div>
</template>

<script>
import CellNotes from './../../components/CellNotes';

export default {
	name: 'SudokuCell',

	components: {
		CellNotes,
	},

	props: {
		col: {
			required: true,
			type: Number,
		},
		row: {
			required: true,
			type: Number,
		},
		subgrid: {
			required: true,
			type: Number,
		},

		digit: {
			default: null,
			required: false,
			type: Number,
		},

		isOriginal: {
			default: false,
			required: false,
			type: Boolean,
		},
		isActive: {
			default: false,
			required: false,
			type: Boolean,
		},
		isInvalid: {
			default: false,
			required: false,
			type: Boolean,
		},

		isPeerCell: {
			default: false,
			required: false,
			type: Boolean,
		},
		isPeerDigit: {
			default: false,
			required: false,
			type: Boolean,
		},

		notes: {
			required: false,
			type: Array,
		},
		activeDigit: {
			default: -1,
			required: false,
			type: Number,
		},
	},

	computed: {
		hasNotes() {
			return this.notes && !!this.notes.filter(digit => digit).length;
		},
	},

	methods: {
		setActive() {
			this.$emit('active', this.row, this.col, this.subgrid, this.digit, this.isOriginal);
		},
	},

	mounted: function () {
		// const elGrid = this.$el.closest('.sudoku-grid');
		// if (elGrid) {
		// 	elGrid.style.fontSize = `${this.$el.offsetHeight * 0.6 / 16}rem`;
		// }
	},
};
</script>

<style lang="scss">
@import "~scss-mixins-functions-variables/scss/typography/font-weight-variables";
@import "./../../scss/color.functions";

.cell {
	// --cell-bg-hue: var(--highlight-hue);
	// --cell-bg-sat: var(--highlight-sat);
	// --cell-bg-lum: 100%;
	// --cell-bg-alpha: 1;

	// // https://github.com/sass/sass/issues/469
	// background: unquote("hsl(var(--cell-bg-hue), var(--cell-bg-sat), var(--cell-bg-lum), var(--cell-bg-alpha))");
	// // color: unquote("hsl(var(--highlight-hue), var(--highlight-sat), var(--highlight-lum))");
	color: css-hsl(var(--color));
	font-family: Rubik, sans-serif;
	font-weight: $typography-weight-medium;
	height: 100%;
	line-height: 1;
	left: 0;
	position: absolute;
	top: 0;
	transition-property: left, top, height, width, background;
	transition-duration: 250ms;
	width: 100%;

	&__content {
		background: none;
		border: 0;
		color: inherit;
		font: inherit;
		height: 100%;
		left: 0;
		padding: 0;
		position: absolute;
		top: 0;
		width: 100%;
	}

	&--original {
		// --cell-bg-alpha: 0.03;
		// --cell-bg-lum: 0%;
		// color: var(--typo);
		color: css-hsla(var(--color), 0.75);
		font-size: 0.8em;
		font-weight: $typography-weight-light;
	}

	&--peer-cell,
	&--peer-digit {
		// --cell-bg-lum: var(--highlight-lum);
	}

	&--peer-cell {
		// --cell-bg-alpha: 0.2;
		// --cell-bg-sat: 25%;
		background: css-hsla(var(--primary), 0.2);
	}

	&--peer-digit {
		// --cell-bg-alpha: 0.5;
		background: css-hsla(var(--primary), 0.75);
		color: css-hsl(var(--bg));
	}

	&--invalid {
		$width: 8px;
		$opacity: 0.5;
		// --cell-bg-hue: var(--invalid-hue);
		// --cell-bg-lum: 50%;
		// --cell-bg-alpha: 0.25;
		background: linear-gradient(45deg, transparent calc(50% - #{$width / 2}), css-hsla(var(--primary), $opacity) calc(50% - #{$width / 2}),  css-hsla(var(--primary), $opacity) calc(50% + #{$width / 2}), transparent calc(50% + #{$width / 2})),
			linear-gradient(-45deg, transparent calc(50% - #{$width / 2}), css-hsla(var(--primary), $opacity) calc(50% - #{$width / 2}),  css-hsla(var(--primary), $opacity) calc(50% + #{$width / 2}), transparent calc(50% + #{$width / 2}));
	}

	&--active {
		// --cell-bg-lum: 100%;
		// --cell-bg-alpha: 1;

		background: css-hsl(var(--bg));
		color: css-hsl(var(--primary));
		border: 4px solid;
		border-radius: 8px;
		font-size: 1.4em;
		height: 140%;
		left: -20%;
		position: absolute;
		top: -20%;
		width: 140%;
		z-index: 1;
	}
}
</style>
