<template>
  <nav class="tabs">
    <ul class="tabs-list">
      <li
        v-for="item in tabs"
        :key="item.name"
        :class="`tabs-list__item ${item.isActive ? 'active' : ''}`"
        @click="setActiveTab(item.name)"
      >
        {{ item.title }}
      </li>
    </ul>
  </nav>
</template>

<script lang="ts" setup>
const emit = defineEmits(["change-active-tab"]);

const tabs = ref<
  {
    name: string;
    title: string;
    isActive: boolean;
  }[]
>([
  {
    name: "all",
    title: "Общее",
    isActive: false,
  },
  {
    name: "products",
    title: "Товары",
    isActive: true,
  },
  {
    name: "additional expenses",
    title: "Доп. расходы",
    isActive: false,
  },
]);

const setActiveTab = (name: string) => {
  tabs.value.forEach(
    (tab: { name: string; title: string; isActive: boolean }) => {
      tab.name === name ? (tab.isActive = true) : (tab.isActive = false);
    }
  );

  emit("change-active-tab", name);
};
</script>

<style lang="scss" scoped>
.tabs {
  &-list {
    display: flex;
    align-items: center;
    &__item {
      font-size: 16px;
      font-weight: 600;
      color: $blue-dark;
      cursor: pointer;
      transition: all ease 0.2s;

      &.active {
        color: $black;
      }
      &:not(.active):hover {
        color: $blue;
        transition: all ease 0.2s;
      }
      &:nth-child(2) {
        margin-left: 20px;
        margin-right: 25px;
      }
    }
  }
}
</style>
