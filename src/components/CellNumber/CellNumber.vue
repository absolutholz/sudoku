<template>
	<!-- y value is just eyeballed for the used text -->
	<svg class="cell-number" preserveAspectRatio="xMinYMin" viewBox="0 -0.5 16 16" width="100%">
		<text x="50%" y="50%"><slot></slot></text>
	</svg>
</template>

<script>
export default {
	name: "CellNumber",
};
</script>

<style lang="scss">
.cell-number {
	text {
		alignment-baseline: central;
		dominant-baseline: central;
		fill: currentColor;
		font-size: 0.5em;
		text-anchor: middle;
	}
}
</style>
