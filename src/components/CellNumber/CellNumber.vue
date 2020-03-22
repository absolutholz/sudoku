<template>
	<!-- y value is just eyeballed for the used text -->
	<svg viewBox="0 1 16 16" width="100%" preserveAspectRatio="xMinYMin">
		<text x="50%" y="50%"><slot></slot></text>
	</svg>
</template>

<script>
export default {
	name: "CellNumber",
};
</script>

<style lang="scss">
svg text {
	alignment-baseline: central;
    dominant-baseline: central;
	fill: currentColor;
    font-size: 0.8rem;
	text-anchor: middle;
}
</style>
