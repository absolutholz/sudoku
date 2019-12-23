<template>
	<div>
		<span>{{ formattedTime }}</span>
		<button
			@click="pause"
		>Pause</button>
	</div>
</template>

<script>
export default {
	name: 'Timer',

	props: {
		seconds: {
			default: 0,
			required: false,
			type: Number,
		},
	},

	computed: {
		formattedTime() {
			const min = Math.floor(this.seconds / 60);
			const sec = this.seconds % 60;

			return `${min > 9 ? min : `0${min}`}:${sec > 9 ? sec : `0${sec}`}`;
		},
	},

	methods: {
		pause () {
			this.$emit('pause');
		},
	},
};
</script>

<style lang="scss">

</style>
