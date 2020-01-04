<template>
	<span class="timer">
		<span v-if="formattedHours"><span class="timer__digit">{{ formattedHours }}</span><abbr class="timer__unit">h</abbr></span>
		<span v-if="formattedMinutes"><span class="timer__digit">{{ formattedMinutes }}</span><abbr class="timer__unit">m</abbr></span>
		<span><span class="timer__digit">{{ formattedSeconds }}</span><abbr class="timer__unit">s</abbr></span>
	</span>
</template>

<script>
export default {
	name: 'Timer',

	props: {
		seconds: {
			default: 0,
			required: false,
			type: Number,
			validator: function (value) {
				return value > -1;
			},
		},
	},

	computed: {
		formattedSeconds () {
			return this.seconds % 60;
		},

		formattedMinutes () {
			return Math.floor(this.seconds / 60) % 60;
		},

		formattedHours () {
			const min = Math.floor(this.seconds / 60);
			return Math.floor(min / 60);
		},
	},
};
</script>
