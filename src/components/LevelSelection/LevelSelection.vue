<template>
	<ol class="levels-list">
		<li v-for="(display, level) in levels" :key="`difficulty-level-${ level }`">
			<btn size="full" variant="outlined" @click="onLevelSelection(level)">{{ display }}</btn>
		</li>
	</ol>
</template>

<script>
import Btn from './../../components/Btn';

export default {
	name: 'LevelSelection',

	components: {
		Btn,
	},

	props: {
		levels: {
			required: true,
			type: Object,
		},
	},

	methods: {
		onLevelSelection (level) {
			console.log(level);
			this.$emit('levelSelection', { level });
		},
	},
}
</script>

<style lang="scss">
.levels-list {
	all: unset;
	display: inline-grid;
	grid-gap: var(--gutter);
	grid-template-columns: repeat(2, 1fr);
	list-style: none;
	max-width: 600px;
	width: 100%;
}
</style>
