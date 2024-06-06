<script setup lang="ts">
import Search from "./components/popups/Search.vue";
</script>
<template>
  <div class="popup">
    <header class="popup__header">Todo App</header>
    <div class="popup__search">
      <Search />
    </div>
  </div>
</template>
<style lang="scss">
#app {
  padding: 3.2rem;
  width: 380px;
  border-radius: 16px;
  border: 1px solid #ececec;
  box-shadow: 0 3.2rem 6.4rem 0 rgba(0, 0, 0, 0.05);
}
.popup {
  &__header {
    margin-bottom: 1.6rem;
    font-size: 2.4rem;
    font-weight: bold;
  }
  &__search {
  }
}
</style>
