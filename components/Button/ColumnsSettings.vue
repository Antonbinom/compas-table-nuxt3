<template>
  <div>
    <Button
      type="button"
      @click="toggleMenu"
      aria-haspopup="true"
      aria-controls="overlay_menu"
    >
      <img class="svg-icon" src="/assets/images/settings.svg" alt="Настройки" />
    </Button>
    <Menu
      :model="menuItems"
      :popup="true"
      ref="menu"
      id="overlay_menu"
      class="dropdown-menu"
      unstyled
      @click="handleMenuClick"
    >
      <template v-if="visibleMenu === 'main'" #start>
        <div
          class="dropdown-menu__item"
          @click="setMenuItems(columnVisibilityMenu, 'visibility')"
        >
          <span class="dropdown-menu__text">Отображение столбцов</span>
          <img
            class="dropdown-menu__image"
            src="/assets/images/arrow.svg"
            alt="стрелка"
          />
        </div>
      </template>
      <template v-if="visibleMenu === 'main'" #end>
        <div
          class="dropdown-menu__item"
          @click="setMenuItems(columnVisibilityMenu, 'order')"
        >
          <span class="dropdown-menu__text">Порядок столбцов</span>
          <img
            class="dropdown-menu__image"
            src="/assets/images/arrow.svg"
            alt="стрелка"
          />
        </div>
      </template>
      <template v-if="visibleMenu === 'visibility'" #start="{ item, props }">
        <div
          class="dropdown-menu__item checkbox"
          @click="setMenuItems([], 'main')"
        >
          <img
            class="dropdown-menu__image"
            src="/assets/images/arrow.svg"
            alt="стрелка назад"
          />
          <span class="dropdown-menu__text">Отображение столбцов</span>
        </div>
      </template>
      <template v-if="visibleMenu === 'visibility'" #item="{ item, props }">
        <Checkbox
          @click.stop=""
          @update.stop=""
          unstyled
          v-model="selectedColumns"
          name="category"
          :inputId="item.key"
          :value="item.label"
          class="dropdown-menu__checkbox"
        />
        <label :for="item.key">{{ item.label }}</label>
      </template>
      <template v-if="visibleMenu === 'order'" #start="{ item, props }">
        <div
          class="dropdown-menu__item checkbox"
          @click="setMenuItems([], 'main')"
        >
          <img
            class="dropdown-menu__image"
            src="/assets/images/arrow.svg"
            alt="стрелка назад"
          />
          <span class="dropdown-menu__text">Порядок столбцов</span>
        </div>
      </template>
      <template v-if="visibleMenu === 'order'" #item="{ item, props }">
        <Checkbox
          @change="handleMenuClick"
          @click="handleMenuClick"
          unstyled
          v-model="selectedColumns"
          name="category"
          :inputId="item.key"
          :value="item.label"
          class="dropdown-menu__checkbox"
        />
        <label :for="item.key">{{ item.label }}</label>
      </template>
    </Menu>
  </div>
</template>

<script setup>
const props = defineProps({
  visibleColumns: Array,
});

const menu = ref();
const visibleMenu = ref("main");
const selectedColumns = ref(props.visibleColumns);
const menuItems = ref([{ items: [] }]);

const columnVisibilityMenu = ref([
  { label: "Номер строки", key: "e", class: "dropdown-menu__item" },
  { label: "Действие", key: "f", class: "dropdown-menu__item" },
  { label: "Наименование единицы", key: "a", class: "dropdown-menu__item" },
  { label: "Цена", key: "b", class: "dropdown-menu__item" },
  { label: "Кол-во", key: "c", class: "dropdown-menu__item" },
  { label: "Вес", key: "в", class: "dropdown-menu__item" },
  { label: "Название товара", key: "d", class: "dropdown-menu__item" },
  { label: "Итого", key: "d", class: "dropdown-menu__item" },
]);

const toggleMenu = (event) => {
  menu.value.toggle(event);
};

const handleMenuClick = (event) => {
  event.stopPropagation();
};

const setMenuItems = (items, menuName) => {
  menuItems.value[0].items = items;
  visibleMenu.value = menuName;
};

const emit = defineEmits(["columns-visibility-change"]);

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

.dropdown-menu__item.checkbox img {
  transform: rotate(180deg);
  color: $blue-gray;
}

.dropdown-menu__item.checkbox .dropdown-menu__text {
  margin-left: 9px;
  margin-right: 0;
}
</style>
