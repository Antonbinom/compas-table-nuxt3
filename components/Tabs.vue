<template>
  <nav class="tabs">
    <ul class="tabs-list">
      <li
        v-for="item in tabs"
        :key="item.name"
        v-show="item.isVisible"
        :class="`tabs-list__item ${item.isActive ? 'active' : ''}`"
        @click="setActiveTab(item.name)"
      >
        {{ item.name }}
      </li>
    </ul>
  </nav>
</template>

<script lang="ts" setup>
const emit = defineEmits(["change-active-tab"]);

const tabs = useTabs();
const setActiveTab = (name: string) => {
  tabs.value.forEach(
    (tab: { name: string; isActive: boolean; isVisible: boolean }) => {
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
    gap: 20px;
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
    }
  }
}
</style>
