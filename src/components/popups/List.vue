<script setup lang="ts">
import { usePopupStore } from "./../../stores/popup-store";
const popup_store = usePopupStore();
import ListItem from "./ListItem.vue";
</script>

<template>
  <ul class="list">
    <ListItem
      v-for="(item, index) in popup_store.list"
      :key="item.id"
      :item="item"
      :index="index"
    />
  </ul>
</template>
