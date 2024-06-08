<script setup lang="ts">
import { usePopupStore } from "./../../stores/popup-store";
const popup_store = usePopupStore();
import ListItem from "./ListItem.vue";
</script>

<template>
  <ul v-if="popup_store.list && popup_store.list.length > 0" class="list">
    <ListItem
      v-for="(item, index) in popup_store.list"
      :key="item.id"
      :item="item"
      :index="index"
    />
  </ul>
  <h3 class="no-items" v-else>No more items...</h3>
</template>
<style lang="scss">
.no-items {
  margin-top: 2rem;
  font-weight: bold;
  text-align: center;
  color: red;
}
</style>
