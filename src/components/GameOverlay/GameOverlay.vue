<template>
	<div
		class="game-overlay"
		:class="modifierClasses"
	>
		<div class="game-overlay__content">
			<slot />
		</div>
	</div>
</template>

<script>
export default {
	name: "GameOverlay",

	props: {
		variant: {
			default: '',
			required: false,
			type: String,
			validator: function (value) {
				// The value must match one of these strings
				return ['', 'game-paused', 'game-over'].indexOf(value) !== -1
			},
		},
	},

	computed: {
		modifierClasses() {
			return `${this.variant ? `game-overlay--${this.variant}` : ''}`;
		},
	},
};
</script>

<style lang="scss">
.game-overlay {
	align-items: center;
	bottom: 0;
	display: flex;
	justify-content: center;
	left: 0;
	position: absolute;
	right: 0;
	text-align: center;
	top: 0;
	z-index: 2;

	&::before {
		backdrop-filter: blur(0.25em);
		background: css-hsla(var(--bg), 0.5);
		bottom: 0;
		content: "";
		left: 0;
		position: absolute;
		right: 0;
		top: 0;
		z-index: -1;
	}

	&__content {
		font-size: 4rem;
		padding: 1rem;
	}

	&--game-paused {
		.icon {
			font-size: 6rem;
		}
	}

	&--game-over {
	}
}
</style>
