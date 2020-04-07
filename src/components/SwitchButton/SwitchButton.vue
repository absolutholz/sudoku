// Non-a11y and/or non-semantic Vue implementations
// http://vue-js-toggle-button.yev.io/
// https://vuejsexamples.com/switch-buttons-with-vue-js/
// https://vuejsexamples.com/an-on-off-switch-component-for-vue-js-with-theme-support/
// https://codepen.io/nickforddesign/pen/NMqwLj
// https://vuematerial.io/components/switch/

// Quality resources
// https://scottaohara.github.io/a11y_styled_form_controls/src/toggle-button-switch/
// https://inclusive-components.design/toggle-button/
// https://www.smashingmagazine.com/2017/09/building-inclusive-toggle-buttons/
// https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/Switch_role
// https://dev.to/link2twenty/accessibility-first-toggle-switches-3obj

// NOTE: aria-checked using string literal because 'false' Boolean causes the attribute to not be rendered

<template>
	<button
		class="switch"
		role="switch"
		:aria-checked="`${state}`"
		@click="toggle"
	></button>
</template>

<script>
export default {
	name: 'ToggleButton',

	props: {
		state: {
			default: false,
			required: false,
			type: Boolean,
		},
	},

	methods: {
		toggle () {
			this.$emit('onToggled', { stateCurrent: this.state, stateDesired: !this.state });
		},
	},
};
</script>

<style lang="scss">
@import "./../../scss/_color.functions.scss";

[role="switch"] {
	font-size: 1.125rem;
	padding: 0.15em;
	position: relative;
	height: 1em;
	width: 2em;
	z-index: 0;

	&::before {
		// background: #c6c5c5;
		background: css-hsl(var(--gray-dark));
		border-radius: 9em;
		content: "";
		display: block;
		height: 100%;
		opacity: 0.5;
		transition: background-color 250ms;
		width: 100%;
		z-index: 1;
	}

	&::after {
		background: css-hsl(var(--gray-light));
		border-radius: 50%;
		box-shadow:
			0 0 2px 0 css-hsla(var(--color), 0.12),
			0 2px 2px 0 css-hsla(var(--color), 0.24);
		// box-shadow: var(--shadow-1), var(--shadow-2);
		content: "";
		display: block;
		height: 1em;
		left: 0;
		position: absolute;
		top: 0;
		transition: left 250ms;
		width: 1em;
		z-index: 2;
	}

	&[aria-checked="true"] {
		&::before {
			// background: transparentize(#2a2a2b, 0.5);
			// background: css-hsl(var(--primary-dark));
		}

		&::after {
			background: css-hsl(var(--primary));
			left: calc(100% - 1em);
		}
	}
}
</style>
