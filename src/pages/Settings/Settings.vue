<template>
	<main>
		<nav class="site-head site-head--portrait">
			<div class="site-head__location">
				<a @click="$router.go(-1)"><svg-arrow-left aria-label="Back" class="icon" /></a>
			</div>
		</nav>
		<div class="l-container">
			<hdln nodeType="h1" variant="page">Settings</hdln>

			<hdln id="gameplay" nodeType="h2" variant="sector">Gameplay</hdln>

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

			<hdln id="appearance" nodeType="h2" variant="sector">Appearance</hdln>

			<form @submit.prevent="handleSubmit">
				<label
					class="input-group"
					for="settings-peer-cells"
				>
					<div class="input-group__control">
						<switch-button
							id="settings-peer-cells"
							@onToggled="setDarkModeState"
							:state="$store.state.darkMode"
						/>
					</div>
					<div class="input-group__label">
						<div class="input__label">Dark Mode</div>
					</div>
				</label>

				<fieldset>
					<legend>Color Theme</legend>

					<ul class="btn-list">
						<li v-for="(name, color) in themes" :key="`theme-${ color }`">
							<label
								class="btn btn--outlined btn--theme"
								:class="`t-${color}`"
								:for="`settings-theme-${ color }`"
							>
								<input
									:id="`settings-theme-${ color }`"
									:checked="$store.state.theme = color"
									name="settings-theme"
									@input="setTheme(color)"
									type="radio"
									:value="color"
								/>
								{{ name }}
							</label>
						</li>
					</ul>
				</fieldset>
			</form>
		</div>
	</main>
</template>

<script>
import Hdln from './../../components/Headline';
import SwitchButton from './../../components/SwitchButton';

import SvgArrowLeft from '@mdi/svg/svg/arrow-left.svg';

export default {
	name: 'SettingsPage',

	components: {
		Hdln,
		SwitchButton,
		SvgArrowLeft,
	},

	data() {
		return {
			themes: {
				'purple': 'Purple',
				'green': 'Green',
				'red': 'Red',
				'blue': 'Blue',
			},
		};
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

		setDarkModeState (data) {
			// this.$store.commit('setDarkMode', { desiredState: data.stateDesired });
			this.$store.dispatch('setDarkMode', {
				stateDesired: data.stateDesired,
			});
		},

		setTheme (theme) {
			const rootClassList = document.querySelector(':root').classList;
			rootClassList.remove(`t-${ this.$store.state.theme }`);
			rootClassList.add(`t-${ theme }`);
			this.$store.commit('setTheme', { theme });
		},

		handleSubmit () {},
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
