<template>
  <button class="dropdown-button" ref="dropdownButton" @click="toggleMenu">
    <img class="svg-icon" src="/assets/images/settings.svg" alt="Настройки" />
  </button>

  <div ref="dropdownMenu" class="dropdown-menu" v-show="isDropdownVisible">
    <ul v-if="visibleMenu === 'main'">
      <li
        v-for="(item, index) in mainMenu"
        :key="index"
        class="dropdown-menu__item main"
        @click="item.action"
      >
        <span class="dropdown-menu__text">{{ item.name }}</span>
        <img
          class="dropdown-menu__image"
          src="/assets/images/arrow.svg"
          alt="стрелка"
        />
      </li>
    </ul>
    <ul v-if="visibleMenu === 'visibility'">
      <li class="dropdown-menu__item header" @click="setMenuItems([], 'main')">
        <img
          class="dropdown-menu__image"
          src="/assets/images/arrow.svg"
          alt="стрелка назад"
        />
        <span class="dropdown-menu__text">Отображение закладок</span>
      </li>
      <div
        v-for="tab in tabs"
        :key="tab.name"
        class="dropdown-menu__item checkbox"
      >
        <Checkbox
          :disabled="tab.isActive"
          unstyled
          v-model="visibleTabs"
          name="tab"
          :inputId="tab"
          :value="tab.name"
          class="dropdown-menu__checkbox"
        />
        <label :for="tab.name">{{ tab.name }}</label>
      </div>
    </ul>
    <ul v-if="visibleMenu === 'order'">
      <li class="dropdown-menu__item header" @click="setMenuItems([], 'main')">
        <img
          class="dropdown-menu__image"
          src="/assets/images/arrow.svg"
          alt="стрелка назад"
        />
        <span class="dropdown-menu__text">Порядок закладок</span>
      </li>
      <draggable v-model="tabs">
        <transition-group>
          <li
            class="dropdown-menu__item"
            v-for="(tab, index) in tabs"
            :key="index"
          >
            {{ tab.name }}
          </li>
        </transition-group>
      </draggable>
    </ul>
  </div>
</template>

<script setup>
import { onClickOutside } from "@vueuse/core";
import { VueDraggableNext } from "vue-draggable-next";

const draggable = VueDraggableNext;
const visibleTabs = useVisibleTabs();
const tabs = useTabs();

const isDropdownVisible = ref(false);
const dropdownButton = ref(null);
const dropdownMenu = ref(null);
const visibleMenu = ref("main");
const menuItems = ref([{ items: [] }]);

const { bottom, right } = useElementBounding(dropdownButton);
const { width: windowWidth } = useWindowSize();

const mainMenu = ref([
  {
    name: "Отображение закладок",
    action: () => setMenuItems(tabs.value, "visibility"),
  },
  {
    name: "Порядок закладок",
    action: () => setMenuItems(tabs.value, "order"),
  },
]);

const toggleMenu = () => {
  isDropdownVisible.value = !isDropdownVisible.value;
};

onClickOutside(dropdownMenu, () => {
  isDropdownVisible.value = false;
});

const setMenuItems = (items, menuName) => {
  menuItems.value[0].items = items;
  visibleMenu.value = menuName;
};

watch(isDropdownVisible, (newValue) => {
  if (newValue && dropdownMenu.value) {
    dropdownMenu.value.style.top = `${bottom.value}px`;
    dropdownMenu.value.style.right = `${windowWidth.value - right.value}px`;
  }
});

watch(
  () => visibleTabs.value,
  () =>
    tabs.value.forEach((tab) =>
      visibleTabs.value.includes(tab.name)
        ? (tab.isVisible = true)
        : (tab.isVisible = false)
    )
);
</script>

<style lang="scss">
.dropdown-button {
  position: relative;
}
.dropdown-menu__text {
  margin-right: 9px;
}

.dropdown-menu__checkbox {
  margin-right: 7px;
}

.dropdown-menu__item.main {
  justify-content: space-between;
}
.dropdown-menu__item.header img {
  transform: rotate(180deg);
  color: $blue-gray;
}

.dropdown-menu__item.header .dropdown-menu__text {
  margin-left: 9px;
  margin-right: 0;
}
.dropdown-menu__item.checkbox {
  padding-left: 0;
}
.dropdown-menu {
  position: absolute;
  z-index: 1000;
}
</style>
