<template>
	<div
		class="cell"
		:class="{
			'cell--active': isActive,
			'cell--related': isRelated,
			'cell--original': isOriginal,
			'cell--invalid': isInvalid,
			'cell--peer': isPeer,
		}"
	>
		<button
			class="cell__content"
			@focus="setActive"
			:readonly="isOriginal"
		>
			{{ value }}
		</button>
	</div>
</template>

<script>
export default {
	name: "SudokuCell",

	props: {
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
		isRelated: {
			default: false,
			required: false,
			type: Boolean,
		},
		isInvalid: {
			default: false,
			required: false,
			type: Boolean,
		},
		isPeer: {
			default: false,
			required: false,
			type: Boolean,
		},
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
		value: {
			required: true,
			type: Number,
		},
	},

	methods: {
		setActive() {
			console.log(this);
			this.$emit('active', this.row, this.col, this.subgrid, this.value);
		},
	},
};
</script>

<style lang="scss">
.cell {
	background: var(--bg);
	// line-height: 1;
	padding-bottom: 100%;
	position: relative;
	// width: 100%;

	&__content {
		align-items: center;
		background: none;
		border: 0;
		display: flex;
		height: 100%;
		justify-content: center;
		left: 0;
		position: absolute;
		top: 0;
		transition: all 150ms;
		width: 100%;
		z-index: 0;

		&::before {
			bottom: 0;
			content: "";
			left: 0;
			position: absolute;
			right: 0;
			top: 0;
			transition: all 150ms;
			z-index: -1;
		}
	}

	&--original {
		.cell__content {
			opacity: 0.75;

			&::before {
				background: var(--color);
				opacity: 0.1;
			}
		}
	}

	&--related {
		.cell__content {

			&::before {
				background: var(--highlight);
				opacity: 0.4;
			}
		}
	}

	&--peer {
		.cell__content {

			&::before {
				background: var(--highlight);
				opacity: 0.8;
			}
		}
	}

	&--active {
		.cell__content {
			border: 4px solid;
			border-radius: 8px;
			color: var(--color);
			font-size: 1.4em;
			height: 140%;
			left: -20%;
			top: -20%;
			width: 140%;
			z-index: 1;

			&::before {
				background: var(--bg);
			}
		}
	}


	// 	.cell__content::before {
	// 		// background: radial-gradient(var(--color) 50%, transparent 50%);
	// 		background: var(--color);
	// 		bottom: 0;
	// 		content: "";
	// 		left: 0;
	// 		opacity: 0.1;
	// 		position: absolute;
	// 		right: 0;
	// 		top: 0;
	// 		z-index: -1;
	// 	}
	// }

	// &--active {
	// 	.cell__content {
	// 		background: var(--bg);
	// 		border: 4px solid;
	// 		border-radius: 8px;
	// 		color: var(--color);
	// 		font-size: 1.4em;
	// 		height: 140%;
	// 		left: -20%;
	// 		top: -20%;
	// 		width: 140%;
	// 		z-index: 1;
	// 	}
	// }

	// &--related:not(.active) {
	// 	.cell__content {
	// 		background: var(--highlight);
	// 		color: var(--color);
	// 	}
	// }
}
</style>
