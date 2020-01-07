<template>
  <button class="btn" type="button">
    <slot />
  </button>
</template>

<script>
export default {
  name: "Generic Button"
};
</script>

<style lang="scss">
@import "~scss-mixins-functions-variables/scss/reset/list/reset-list-mixins";

.btn {
  align-items: center;
  background: none;
  border: 0;
  color: inherit;
  cursor: pointer;
  //   display: inline-flex;
  justify-content: center;
  text-decoration: none;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &--with-switch {
    flex-direction: column;

    [role="switch"] {
      font-size: 0.75em;
    }
  }

  &__small {
    font-size: 0.75rem;
    text-transform: none;
  }
}

.btn-grid {
  @include reset-list;

  display: inline-grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(5, auto);

  > li {
    align-items: center;
    display: flex;
    justify-content: center;
  }
}
</style>
