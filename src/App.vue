<template>
  <div id="app">
    <sudoku />
  </div>
</template>

<script>
import Sudoku from './components/Sudoku.vue';

export default {
  name: 'app',

  components: {
    Sudoku,
  },
};
</script>
