<template>
	<form @reset="clear">
		<svg viewBox="0 0 16 16" width="100%" preserveAspectRatio="xMinYMin">
			<text x="50%" y="50%">{{ digit }}</text>
		</svg>
		<label :for="inputId">

			<input
				:id="inputId"
				:list="datalistId"
				max="9"
				min="1"
				required
				step="1"
				type="number"
				v-model="digit"
				@input="check"
			>
			<datalist :id="datalistId">
				<option value="1" />
				<option value="2" />
				<option value="3" />
				<option value="4" />
				<option value="5" />
				<option value="6" />
				<option value="7" />
				<option value="8" />
				<option value="9" />
			</datalist>
		</label>
		<button type="reset">Clear Field</button>
	</form>
</template>

<script>
export default {
  name: "CellNumber",

	data () {
		return {
			digit: null,
			inputId: `cell-digit-${Math.random()}`,
			datalistId: `cell-list-${Math.random()}`,
		};
	},

  	props: {
		// digit: {
		// 	default: null,
		// 	required: false,
		// 	type: Number,
		// },
	},

	methods: {
		clear () {
			this.digit = null;
		},

		check (event) {
			if (!event.target.checkValidity()) {
				const value = this.digit;
				const regex = /[123456789](?=[^[123456789]*$)/;
				const match = value.match(regex);
				console.log(match);
				if (match && match.length) {
					this.digit = match[0];
				} else {
					event.target.value = null;
					this.digit = null;
				}
			}
		},
	},
};
</script>

<style lang="scss">
svg text {
	alignment-baseline: central;
    dominant-baseline: central;
    font-size: 0.8rem;
	line-height: 1;
    text-anchor: middle;
}
</style>
