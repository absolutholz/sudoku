<template>
	<div class="l-page-container">
		<h1>Settings</h1>

		<nav>
			<router-link to="/">Back to Home</router-link>
			<router-link to="/game" v-if="$store.state.puzzle.length">Back to Game</router-link>
		</nav>

		<form @submit.prevent="handleSubmit">
			<label
				class="input-group"
				for="settings-peer-cells"
			>
				<div class="input-group__control">
					<switch-button
						id="settings-peer-cells"
						@onToggled="setPeerCellsDisplayState"
						:state="$store.state.displayPeerCells"
					/>
				</div>
				<div class="input-group__label">
					<h2 class="input__label">Highlight peer cells</h2>
					<p class="input__help">When a cell is selected, visually highlight other cells in the same subgrid, row and column.</p>
				</div>
			</label>

			<label
				class="input-group"
				for="settings-peer-digits"
			>
				<div class="input-group__control">
					<switch-button
						id="settings-peer-digits"
						@onToggled="setPeerDigitsDisplayState"
						:state="$store.state.displayPeerDigits"
					/>
				</div>
				<div class="input-group__label">
					<h2 class="input__label">Highlight peer digits</h2>
					<p class="input__help">When a cell with a digit is selected, visually highlight other cells on the gameboard with the same digit.</p>
				</div>
			</label>

			<label
				class="input-group"
				for="settings-errors"
			>
				<div class="input-group__control">
					<switch-button
						id="settings-errors"
						@onToggled="setErrorsDisplayState"
						:state="$store.state.displayErrors"
					/>
				</div>
				<div class="input-group__label">
					<h2 class="input__label">Highlight errors</h2>
					<p class="input__help">When a cell is selected that contains a digit, visually highlight other cells in the same subgrid, row or column that conflict with it.</p>
				</div>
			</label>
		</form>
	</div>
</template>

<script>
import SwitchButton from './../../components/SwitchButton';

export default {
	name: 'SettingsPage',

	components: {
		SwitchButton,
	},

	methods: {
		setPeerCellsDisplayState (data) {
			this.$store.commit('setDisplayPeerCells', { desiredState: data.stateDesired });
		},

		setPeerDigitsDisplayState (data) {
			this.$store.commit('setDisplayPeerDigits', { desiredState: data.stateDesired });
		},

		setErrorsDisplayState (data) {
			this.$store.commit('setDisplayErrors', { desiredState: data.stateDesired });
		},

		handleSubmit () {

		},
	},
};
</script>

<style lang="scss">
.input-group {
	display: grid;
	grid-gap: 1rem;
	grid-template-columns: auto 1fr;
	margin-bottom: 2rem;
	margin-top: 2rem;

	&__control {

	}

	&__label {

	}
}

.input {
	&__label {
		font-size: inherit;
		font-weight: inherit;
		margin: 0;
	}

	&__help {
		font-size: 0.875em;
		margin-top: 0.5em;
	}
}
</style>
