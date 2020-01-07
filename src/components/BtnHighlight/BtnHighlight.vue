<template>
  <button class="btn btn--highlight">
    <slot />
  </button>
</template>

<script>
export default {
  name: "BtnHighlight"
};
</script>

<style lang="scss">
.btn--highlight {
  background: var(--highlight);
  border-radius: 6px;
  color: var(--bg);
  font-size: 1.25rem;
  padding: 0.5em 1em;
  text-transform: uppercase;
}
</style>
