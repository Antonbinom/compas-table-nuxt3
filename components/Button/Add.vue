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
  color: #fff;
  border-radius: 5px;
  background-color: #2f8cff;
  @include button-hover($blue-dark);
  &-icon {
    margin-right: 7px;
  }
}
</style>
