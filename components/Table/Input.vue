<template>
  <InputNumber
    @input="updateInputValue"
    :modelValue="value"
    :invalid="value === 0 && !readonly"
    :readonly="readonly"
    :useGrouping="false"
    class="input"
    borderColor
  />
</template>

<script lang="ts" setup>
defineProps({
  value: Number,
  readonly: Boolean,
});

const emit = defineEmits(["update-input"]);

const updateInputValue = (event: any) => {
  emit("update-input", Number(event.value));
};
</script>

<style lang="scss">
.p-inputnumber {
  width: 100%;
}
</style>
