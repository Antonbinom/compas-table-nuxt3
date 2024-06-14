<template>
  <Dropdown
    v-model="select"
    :options="options"
    @update:modelValue="updateSelectedValue"
    optionLabel="name"
    class="select"
    scrollHeight="145px"
    :invalid="selectedValue?.name === ''"
  >
    <template #option="{ option }">
      <div class="custom-option">
        <span>{{ option.name }}</span>
      </div>
    </template>
  </Dropdown>
</template>

<script lang="ts" setup>
interface Option {
  name: string;
  code: string;
}

const props = defineProps({
  selectedValue: Object,
  options: Array,
});

const emit = defineEmits(["update-select"]);

const select = ref(props.selectedValue);

watch(
  () => props.selectedValue,
  () => (select.value = props.selectedValue)
);

const updateSelectedValue = (value: Option) => {
  emit("update-select", value.name);
};
</script>

<style lang="scss">
.select {
  width: 100%;
  border-radius: 5px;
  font-size: 16px;
}
.p-dropdown-label {
  color: $black;
  font-family: MyriadPro;
  padding: 8px 10px 8px 14px;
}

.custom-selected-item {
  color: #333;
  font-weight: bold;
}

.p-dropdown-panel {
  border-radius: 5px;
  box-shadow: 0 0 3px 0 $black, inset 0 1px 2px 0 rgba(255, 255, 255, 0.5);
  background-color: $white;
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

.p-dropdown-trigger {
  background: #f6f5f3;
  width: 21px;
  & svg {
    transform: rotate(270deg);
    height: 7px;
    color: $grey-2;
  }
  &:hover {
    background: #ffeabf;
    transition: all ease 0.2s;
  }
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
