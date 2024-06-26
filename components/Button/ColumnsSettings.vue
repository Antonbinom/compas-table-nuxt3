<template>
  <button ref="dropdownButton" @click="toggleMenu">
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
        <span class="dropdown-menu__text">Отображение столбцов</span>
      </li>
      <div
        v-for="item in columnVisibilityMenu"
        :key="item.key"
        class="dropdown-menu__item checkbox"
      >
        <Checkbox
          unstyled
          v-model="selectedColumns"
          name="category"
          :inputId="item.key"
          :value="item.label"
          class="dropdown-menu__checkbox"
        />
        <label :for="item.key">{{ item.label }}</label>
      </div>
    </ul>
    <ul v-if="visibleMenu === 'order'">
      <li class="dropdown-menu__item header" @click="setMenuItems([], 'main')">
        <img
          class="dropdown-menu__image"
          src="/assets/images/arrow.svg"
          alt="стрелка назад"
        />
        <span class="dropdown-menu__text">Порядок столбцов</span>
      </li>
      <draggable v-model="columnsOrder">
        <transition-group>
          <li
            class="dropdown-menu__item"
            v-for="(column, index) in columnsOrder"
            :key="index"
          >
            {{ column }}
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
const props = defineProps({
  visibleColumns: Array,
});

const columnsOrder = useColumnsOrder();

const isDropdownVisible = ref(false);
const dropdownButton = ref(null);
const dropdownMenu = ref(null);
const visibleMenu = ref("main");
const selectedColumns = ref(props.visibleColumns);
const menuItems = ref([{ items: [] }]);
const { bottom, right } = useElementBounding(dropdownButton);
const { width: windowWidth } = useWindowSize();

const mainMenu = ref([
  {
    name: "Отображение столбцов",
    action: () => setMenuItems(columnVisibilityMenu.value, "visibility"),
  },
  {
    name: "Порядок столбцов",
    action: () => setMenuItems(columnsOrder.value, "order"),
  },
]);
const columnVisibilityMenu = ref([
  { label: "Номер строки", key: "e" },
  { label: "Действие", key: "f" },
  {
    label: "Наименование единицы",
    key: "a",
  },
  { label: "Цена", key: "b" },
  { label: "Кол-во", key: "c" },
  { label: "Вес", key: "в" },
  { label: "Название товара", key: "d" },
  { label: "Итого", key: "d" },
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

const emit = defineEmits(["columns-visibility-change"]);

watch(isDropdownVisible, (newValue) => {
  if (newValue && dropdownMenu.value) {
    dropdownMenu.value.style.top = `${bottom.value}px`;
    dropdownMenu.value.style.right = `${windowWidth.value - right.value}px`;
  }
});

watch(
  () => selectedColumns.value,
  () => emit("columns-visibility-change", selectedColumns.value)
);
</script>

<style lang="scss">
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
