<template>
	<span class="timer">
		<svg-clock-outline
			aria-hidden="true"
			class="icon timer__icon"
		/>
		<span v-if="formattedHours">
			<span class="timer__digit">{{ formattedHours }}</span>
			<abbr
				:aria-label="formattedHours > 1 ? 'hours' : 'hour'"
				class="timer__unit"
			>h</abbr>
		</span>
		<span v-if="formattedMinutes">
			<span class="timer__digit">{{ formattedMinutes }}</span>
			<abbr
				:aria-label="formattedHours > 1 ? 'minutes' : 'minute'"
				class="timer__unit"
			>m</abbr>
		</span>
		<span>
			<span class="timer__digit">{{ formattedSeconds }}</span>
			<abbr
				:aria-label="formattedHours > 1 ? 'seconds' : 'second'"
				class="timer__unit"
			>s</abbr>
		</span>
	</span>
</template>

<script>
import SvgClockOutline from "@mdi/svg/svg/clock-outline.svg";

export default {
  name: "TimerDisplay",

  components: {
    SvgClockOutline
  },

  props: {
    seconds: {
      default: 0,
      required: false,
      type: Number,
      validator: function(value) {
        return value > -1;
      }
    }
  },

  computed: {
    formattedSeconds() {
      return this.seconds % 60;
    },

    formattedMinutes() {
      return Math.floor(this.seconds / 60) % 60;
    },

    formattedHours() {
      const min = Math.floor(this.seconds / 60);
      return Math.floor(min / 60);
    },
  },
};
</script>

<style lang="scss">
.timer {
  align-items: center;
  display: inline-flex;
  vertical-align: bottom;

  > * {
    margin-right: 0.25em;

    &:last-child {
      margin-right: 0;
    }
  }

  &__icon {
    font-size: 1.125em;
  }
}
</style>
