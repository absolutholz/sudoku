<template>
	<div id="app">
		<router-view/>
	</div>
</template>

<script>
export default {
	name: 'App',
};
</script>

<style lang="scss">
@import "~scss-mixins-functions-variables/scss/typography/font-face-mixins";
@import "~scss-mixins-functions-variables/scss/typography/font-weight-variables";

// https://www.fontsquirrel.com/tools/webfont-generator
// @include font-face ("Rubik", "/fonts/Rubik/subset/rubik-regular-webfont", $exts: woff2);
// @include font-face ("Rubik", "/fonts/Rubik/subset/rubik-black-webfont", $typography-weight-black, $exts: woff2);
// @include font-face ("Rubik", "/fonts/Rubik/subset/rubik-bold-webfont", $typography-weight-bold, $exts: woff2);
@include font-face ("Rubik", "/fonts/Rubik/subset/rubik-light-webfont", $typography-weight-light, $exts: woff2);
// @include font-face ("Rubik", "/fonts/Rubik/subset/rubik-medium-webfont", $typography-weight-medium, $exts: woff2);

@import "~semantic-reboot/src/reboot";
@import "./scss/theme-base";
@import "./scss/layout";

.icon {
	color: inherit;
	fill: currentColor;
	font-size: 1.5em;
	height: 1em;
	width: 1em;
}
</style>
