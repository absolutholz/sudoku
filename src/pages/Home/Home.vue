<template>
  <main class="l-page-container page--home">
    <h1>Sudoku</h1>

    <section class="page-section" v-if="$store.state.puzzle.length">
      <h2 class="page-section__hdln">Current game</h2>
      <div>
        <button class="page-section__btn" @click="resumeGame()">Resume</button>
      </div>
    </section>

    <section class="page-section">
      <h2 class="page-section__hdln">New game</h2>
      <ol class="levels-list">
        <li v-for="(display, level) in levels" :key="`difficulty-level-${ level }`">
          <button class="page-section__btn" @click="startNewGame(level)">{{ display }}</button>
        </li>
      </ol>
    </section>

    <section class="page-section">
      <h2 class="page-section__hdln">Gameplay Settings</h2>
      <div>
        <router-link class="page-section__btn" to="/settings">Settings</router-link>
      </div>
    </section>
  </main>
</template>

<script>
import levels from "./../../difficulty-levels";

export default {
  name: "HomePage",

  data() {
    return {
      difficulty: false,
      levels
    };
  },

  methods: {
    startNewGame(difficulty) {
      this.$store.commit("generatePuzzle", { difficulty });
      this.$store.dispatch("startGame");
      this.$router.push({
        name: "game"
      });
    },

    resumeGame() {
      this.$router.push({
        name: "game"
      });
    }
  }
};
</script>

<style lang="scss">
@import "~scss-mixins-functions-variables/scss/reset/list/reset-list-mixins";

.page--home {
  text-align: center;
}

.page-section {
  margin: 3rem 0;

  &__hdln {
    text-transform: capitalize;
  }
}

.levels-list {
  @include reset-list;

  display: inline-grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(2, 1fr);
}
</style>
