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
		class="toggler"
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
[role="switch"] {
	// reset button
	background: none;
	border: 0;
	color: inherit;
	// font-size: 1.25rem;
	padding: 0.15em;
	position: relative;
	height: 1em;
	width: 2em;

	&::before {
		background: #c6c5c5;
		border-radius: 9em;
		content: "";
		display: block;
		height: 100%;
		transition: background-color 250ms;
		width: 100%;
	}

	&::after {
		background: #f1f1f1;
		border-radius: 9em;
		box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24);
		content: "";
		display: block;
		height: 1em;
		left: 0;
		position: absolute;
		top: 0;
		transition: left 250ms;
		width: 1em;
	}

	&[aria-checked="true"] {
		&::before {
			background: transparentize(#5b8edc, 0.5);
		}

		&::after {
			background: #5b8edc;
			left: calc(100% - 1em);
		}
	}
}
</style>
