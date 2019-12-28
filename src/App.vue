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
@import "~semantic-reboot/src/reboot";
@import "./scss/theme-base";
@import "./scss/layout";
@import "~scss-mixins-functions-variables/scss/typography/font-face-mixins";
@include font-face ("Rubik", "./fonts/Rubik/subset/Rubik-Regular-subfont", $exts: "woff2");
</style>
