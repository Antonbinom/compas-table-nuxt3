<template>
  <div class="layout">
    <Drawer v-if="isDrawerOpened" />
    <main>
      <slot />
    </main>
  </div>
</template>

<script lang="ts" setup>
const isDrawerOpened = useOpenDrawer();
</script>

<style lang="scss">
.layout {
  display: flex;
}
main {
  width: 100%;
  background-color: #fbfcfd;
}
</style>
