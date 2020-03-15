<template>
	<component
		class="hdln"
		:class="variant ? `hdln--${variant}` : ''"
		:is="nodeType"
	><slot /></component>
</template>

<script>
export default {
	name: "Hdln",

	props: {
		nodeType: {
			default: 'h2',
			required: false,
			type: String,
		},

		variant: {
			default: '',
			required: false,
			type: String,
			validator: function (value) {
				// The value must match one of these strings
				return ['', 'page', 'sector'].indexOf(value) !== -1
			},
		},
},
};
</script>

<style lang="scss">
@import "./../../scss/color.functions";
@import "./../../scss/typography.variables";
@import "./../../scss/typography.functions";
@import "./../../scss/layout.variables";
@import "./../../scss/layout.functions";

.hdln {
	margin-bottom: 0;
	margin-top: 0;

	abbr[title] {
		text-decoration: none;
	}

	b {
		color: css-hsl(var(--primary));
		font-size: 1.61803398875em;
		font-weight: inherit;
	}

	&::after {
		background: css-hsla(var(--primary));
		content: "";
		display: block;
		height: 0.25rem;
		margin-top: 0.25rem;
		width: 10rem;
	}

	&--page {
		@include typo("larger-4");
		font-weight: $typography-weight-light;
		letter-spacing: -0.05ch;
		margin-bottom: $spacing-level-5;
		margin-top: $spacing-level-10;

		@include for-medium-up () {
			@include typo("larger-5");
			margin-bottom: $spacing-level-6;
			margin-top: $spacing-level-12;
		}
	}

	&--sector {
		@include typo("larger-2");
		font-weight: $typography-weight-normal;
		margin-bottom: $spacing-level-2;
		margin-top: $spacing-level-8;

		@include for-medium-up () {
			@include typo("larger-3");
			margin-bottom: $spacing-level-3;
			margin-top: $spacing-level-10;
		}
	}
}
</style>
