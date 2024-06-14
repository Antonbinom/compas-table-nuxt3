<template>
  <div class="result">
    <div class="result-top">
      <div class="result-item">
        <span class="result-item__name">Сумма:</span>
        <span class="result-item__value">{{ results?.price }}</span>
      </div>
      <div class="result-item">
        <span class="result-item__name">Кол-во:</span>
        <span class="result-item__value">{{ results?.count }}</span>
      </div>
      <div class="result-item">
        <span class="result-item__name">Общий вес:</span>
        <span class="result-item__value">{{ results?.weight }}</span>
      </div>
    </div>
    <div class="result-total">
      <div class="result-item">
        <span class="result-item__name">Общая сумма:</span>
        <span class="result-item__value">{{ results?.price }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  results: Object,
});
</script>

<style lang="scss" scoped>
@mixin wrapper {
  border-radius: 5px;
  border: solid 1px $primary;
  background-color: #fbfcfd;
}

.result {
  display: flex;
  flex-direction: column;
  width: 304px;
  font-size: 14px;
}
.result-top {
  @include wrapper();
  padding: 15px;
  margin-bottom: 5px;
  .result-item__name {
    color: $grey-2;
  }
}
.result-total {
  @include wrapper();
  padding: 15px;
  .result-item__value {
    font-weight: 600;
  }
}
.result-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: $black;
  &:not(:last-child) {
    margin-bottom: 10px;
  }
}

@media (max-width: 767px) {
  .result {
    width: 100%;
  }
}
</style>
