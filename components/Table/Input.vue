<template>
  <input
    class="input"
    :value="value"
    @input="updateInputValue"
    type="text"
    :readonly="readonly"
  />
</template>

<script lang="ts" setup>
defineProps({
  value: Number,
  readonly: Boolean,
});

const emit = defineEmits(["update-input"]);

const updateInputValue = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const validatedValue = input.value.replace(/\D/g, "");
  input.value = validatedValue;
  emit("update-input", validatedValue);
};
</script>

<style lang="scss" scoped>
.input {
  @include input();
}
</style>
