<template>
  <aside class="right-drawer">
    <button
      @click="isDrawerOpened = false"
      :class="`drawer-close ${isDrawerOpened ? 'opened' : 'closed'}`"
    >
      x
    </button>
  </aside>
</template>
<script lang="ts" setup>
const isDrawerOpened = useOpenDrawer();
</script>

<style lang="scss" scoped>
.right-drawer {
  position: relative;
  min-width: 229px;
  height: 100vh;
  background-image: radial-gradient(circle at 29% 0, $black, #1c2734 103%);
}
@media (max-width: 1000px) {
  .right-drawer {
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    &.opened {
      display: flex;
    }
    &.closed {
      display: none;
    }
  }
  .drawer-close {
    position: absolute;
    top: 20px;
    right: 20px;
    color: $white;
  }
}
</style>
