<template>
  <aside class="right-drawer">
    <slot />
  </aside>
</template>

<style scoped>
.right-drawer {
  min-width: 229px;
  height: 100vh;
  background-image: radial-gradient(circle at 29% 0, #000, #1c2734 103%);
}
</style>
