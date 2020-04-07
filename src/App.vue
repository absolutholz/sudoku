<template>
	<div id="app">
		<router-view/>
	</div>
</template>

<script>
export default {
	name: 'App',

	mounted() {
		let bDarkMode = false;

		if (this.$store.state.darkMode === null) {
			if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
				bDarkMode = true;
			} else {
				bDarkMode = false;
			}
		}

		this.$store.dispatch('setDarkMode', {
			stateDesired: bDarkMode,
		});
	},
};
</script>

<style lang="scss">
@import "./scss/index";
</style>
