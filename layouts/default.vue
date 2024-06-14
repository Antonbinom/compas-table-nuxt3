<template>
  <div class="layout">
    <Drawer v-if="(isDrawerOpened && isMobile) || !isMobile" />
    <main>
      <slot />
    </main>
  </div>
</template>

<script lang="ts" setup>
import { useWindowSize } from "@vueuse/core";
const { width } = useWindowSize();

const isMobile = computed(() => width.value < 768);
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
