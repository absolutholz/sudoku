<template>
	<main>
		<div class="l-container">
			<hdln nodeType="h1" variant="page"><abbr aria-label="Progressive Web App" title="Progressive Web App">PWA</abbr> <b>Sudoku</b></hdln>
		</div>

		<section class="section" v-if="$store.state.puzzle.length">
			<div class="l-container">
				<hdln nodeType="h2" variant="sector"><b>Current</b> game</hdln>

				<div>
					<btn variant="outlined" @click="resumeGame()">Resume</btn>
				</div>
			</div>
		</section>

		<section class="section">
			<div class="l-container">
				<hdln nodeType="h2" variant="sector"><b>New</b> Game</hdln>

				<level-selection :levels="levels" @levelSelection="onLevelSelected"></level-selection>
			</div>
		</section>

		<section class="section">
			<div class="l-container">
				<hdln nodeType="h2" variant="sector">Settings & Rules</hdln>

				<div>
					<router-link to="/settings">Settings</router-link>
					<br>
					<a href="https://sudoku.com/how-to-play/sudoku-rules-for-complete-beginners/" rel="nofollow noreferrer" target="_blank">How to play</a>
				</div>
			</div>
		</section>
	</main>
</template>

<script>
import levels from "./../../difficulty-levels";

import Hdln from './../../components/Headline';
import Btn from './../../components/Btn';
import LevelSelection from './../../components/LevelSelection';

export default {
	name: "HomePage",

	components: {
		Hdln,
		Btn,
		LevelSelection,
	},

	data () {
		return {
			difficulty: false,
			levels,
		};
	},

	methods: {
		startNewGame (difficulty) {
			this.$store.commit("generatePuzzle", { difficulty });
			this.$store.dispatch("startGame");
			this.$router.push({
				name: "game"
			});
		},

		resumeGame () {
			this.$router.push({
				name: "game",
			});
		},

		onLevelSelected (data) {
			this.startNewGame(data.level);
		},
	},
};
</script>

<style lang="scss">
// @import "~scss-mixins-functions-variables/scss/typography/font-weight-variables";
// @import "../../scss/typography.variables";
// @import "../../scss/spacing.variables";

// .hdln {
// 	font-weight: $typography-weight-light;
// 	margin-bottom: 0;
// 	margin-top: 0;
// 	text-transform: lowercase;

// 	b {
// 		color: var(--primary);
// 		font-weight: $typography-weight-bold;
// 		text-transform: uppercase;
// 	}

// 	&--page {
// 		@include typo("larger-4");
// 		margin-bottom: $spacing-level-4;
// 		margin-top: $spacing-level-8;

// 		b {
// 			@include typo("larger-5");
// 		}
// 	}

// 	&--section {
// 		@include typo("larger-3");
// 		margin-bottom: $spacing-level-2;
// 		margin-top: $spacing-level-6;
// 	}
// }

// .page {
// 	&--home {
// 		display: flex;
// 		justify-content: center;
// 	}
// }

// .btn {
// 	background: var(--primary-light);
//     color: #111;
// 	display: inline-flex;
//     font-weight: bold;
// 	line-height: inherit;
// 	padding: 0.25rem 2rem;
// 	text-decoration: none;
// 	text-transform: uppercase;
// }
</style>
