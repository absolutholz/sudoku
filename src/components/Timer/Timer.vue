<template>
	<label
		class="timer"
		for="game-timer"
	>
		<span class="timer__time">{{ formattedTime }}</span>
		<button
			class="btn timer__btn"
			@click="pause"
			id="game-timer"
		><svg-pause class="icon" /></button>
	</label>
</template>

<script>
import SvgPause from '@mdi/svg/svg/pause.svg';

export default {
	name: 'Timer',

	components: {
		SvgPause,
	},

	props: {
		seconds: {
			default: 0,
			required: false,
			type: Number,
		},
	},

	computed: {
		formattedTime() {
			const sec = this.seconds % 60;
			const min = Math.floor(this.seconds / 60);
			const hour = Math.floor(min / 60);

			let time = `${ sec }s`;
			if (min > 0 || hour > 0) {
				time = `${ min % 60 }m, ${ time }`;
			}
			if (hour > 0) {
				time = `${ hour }h, ${ time }`;
			}

			return time;
			// return `${min > 9 ? min : `0${min}`}:${sec > 9 ? sec : `0${sec}`}`;
		},
	},

	methods: {
		pause () {
			this.$emit('pause');
		},
	},

	mounted () {
		setInterval(() => {
			if (!this.$store.state.isPaused && !this.$store.state.isComplete) {
				this.$store.commit('incrementTimer');
			}
		}, 1000);
	}
};
</script>

<style lang="scss">
.timer {
	display: inline-flex;
	align-items: center;

	&__time {

	}

	&__btn {
		font-size: 1.5em;
		margin: -0.5em -0.25em;
		padding: 0.5em;
	}
}
</style>
