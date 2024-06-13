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
    <ButtonColumnsSettings />
  </nav>
</template>

<script lang="ts" setup>
const emit = defineEmits(["change-active-tab"]);

const tabs = ref<
  {
    name: string;
    title: string;
    isActive: boolean;
    link: string;
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
    title: "Доп.расходы",
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
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
  &-list {
    display: flex;
    align-items: center;
    &__item {
      font-size: 16px;
      font-weight: 600;
      color: #1253a2;
      cursor: pointer;
      &.active {
        color: #000;
      }
      &:nth-child(2) {
        margin-left: 20px;
        margin-right: 25px;
      }
    }
  }
}
</style>
