<template>
	<component
		class="btn"
		:class="modifierClasses"
		@click="onClick"
		:is="nodeType"
	><slot /></component>
</template>

<script>
export default {
	name: "Btn",

	props: {
		nodeType: {
			default: 'button',
			required: false,
			type: String,
		},

		variant: {
			default: '',
			required: false,
			type: String,
			validator: function (value) {
				// The value must match one of these strings
				return ['', 'outlined', 'contained'].indexOf(value) !== -1
			},
		},

		size: {
			default: '',
			required: false,
			type: String,
			validator: function (value) {
				// The value must match one of these strings
				return ['', 'full'].indexOf(value) !== -1
			},
		},
	},

	computed: {
		modifierClasses() {
			return `${this.variant ? `btn--${this.variant}` : ''} ${this.size ? `btn--${this.size}` : ''}`;
		},
	},

	methods: {
		onClick () {
			console.log('level');
			this.$emit('click');
		},
	},
};
</script>

<style lang="scss">
@import "./../../scss/color.functions";
@import "./../../scss/typography.functions";
@import "./../../scss/layout.functions";

.btn {
	border: 1px solid transparent;
	border-radius: 4px;
	color: css-hsl(var(--primary));
	display: inline-block;
	font-size: typo-size("base");
	font-weight: 600;
	letter-spacing: 0.1ch;
	padding: 0.5rem 1.5rem 0.75rem;
	position: relative;
	text-decoration: none;
	text-transform: uppercase;

	@include for-medium-up () {
		font-size: typo-size("larger-1");
		padding: 0.75rem 3rem 1rem;
	}

	&--outlined {
		border-color: css-hsl(var(--border-color));

		&,
		&.t-light {
			--border-color: var(--gray-dark);
		}

		&.t-dark {
			--border-color: var(--gray-light);
		}

		@media (prefers-color-scheme: dark) {
			--border-color: var(--gray-light);
		}
	}

	&--contained {
		background: css-hsl(var(--primary));
		color: css-hsl(var(--bg));
	}

	&--full {
		width: 100%;
	}

	&--theme {
		border-color: inherit;

		input {
			display: none;
		}
	}
}

@import "~scss-mixins-functions-variables/scss/reset/list/reset-list-mixins";

.btn-list {
	@include reset-list;

	display: flex;
	flex-wrap: wrap;
	margin: -0.5rem;

	> li {
		margin: 0.5rem;
	}
}
</style>
