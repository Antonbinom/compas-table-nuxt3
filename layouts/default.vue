<template>
  <div class="layout">
    <Drawer />
    <main>
      <slot />
    </main>
  </div>
</template>

<style lang="scss">
.layout {
  display: flex;
}
main {
  width: 100%;
  background-color: #fbfcfd;
}
</style>
