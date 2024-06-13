<template>
  <Dropdown
    v-model="select"
    :options="options"
    @update:modelValue="updateSelectedValue"
    optionLabel="name"
    class="select"
    scrollHeight="145px"
  >
    <template #option="{ option }">
      <div class="custom-option">
        <span>{{ option.name }}</span>
      </div>
    </template>
  </Dropdown>
</template>

<script lang="ts" setup>
const props = defineProps({
  selectedValue: Object,
  options: Array,
});

const emit = defineEmits(["update-select"]);

const select = ref<{ name: object }>(props.selectedValue);

watch(
  () => props.selectedValue,
  () => (select.value = props.selectedValue)
);

const updateSelectedValue = (event: Event) => {
  emit("update-select", event.name);
};
</script>

<style lang="scss">
.select {
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  font-size: 16px;
}
.p-dropdown-label {
  color: #000;
  font-family: MyriadPro;
  padding: 10px 10px 9px 10px;
}

.custom-selected-item {
  color: #333;
  font-weight: bold;
}

.p-dropdown-panel {
  border-radius: 5px;
  box-shadow: 0 0 3px 0 #000, inset 0 1px 2px 0 rgba(255, 255, 255, 0.5);
  background-color: #fff;
}

.p-dropdown-item {
  font-family: MyriadPro;
  font-size: 14px;
  color: #161616;
  padding: 7px 10px;

  &.p-highlight {
    background: none;
    &:hover {
      background: #f2f8fe;
    }
  }
}
.custom-option {
  display: flex;
  justify-content: space-between;
  padding: 0;
}

.custom-option-code {
  color: #888;
  font-size: 0.9em;
}

.p-dropdown-items-wrapper {
  ::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  scrollbar-width: none;
  -ms-overflow-style: none;
}
</style>
