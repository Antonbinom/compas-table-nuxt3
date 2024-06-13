<template>
  <Button
    type="button"
    @click="toggle"
    aria-haspopup="true"
    aria-controls="overlay_menu"
  >
    <img src="/assets/images/dots.svg" alt="Меню" />
  </Button>
  <Menu
    class="dropdown-menu"
    unstyled
    ref="menu"
    id="overlay_menu"
    :model="items"
    :popup="true"
  />
</template>

<script lang="ts" setup>
const emit = defineEmits(["remove-item"]);

const menu = ref();
const items = ref([
  {
    items: [
      {
        label: "Удалить",
        command: () => emit("remove-item"),
        class: "dropdown-menu__item delete",
      },
    ],
  },
]);

const toggle = (event) => {
  menu.value.toggle(event);
};
</script>

//TODO:hover
<style lang="scss">
.dropdown-menu__item.delete {
  color: #ae0a0a;
  font-size: 14px;
  cursor: pointer;
}
</style>
