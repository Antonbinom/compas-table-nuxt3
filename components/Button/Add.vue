<template>
  <button class="button">
    <img
      class="button-icon"
      src="/assets/images/add.svg"
      alt="Добавить строку"
    />
    <span class="button-text">Добавить строку</span>
  </button>
</template>

<script setup></script>

<style lang="scss" scoped>
.button {
  display: flex;
  align-items: center;
  padding: 10px 15px 10px 10px;
  font-size: 14px;
  color: $white;
  border-radius: 5px;
  background-color: $blue;
  @include button-hover($blue-dark);
  &-icon {
    margin-right: 7px;
  }
}
</style>
