<script setup lang="ts">
import { usePopupStore } from "./../../stores/popup-store";
import IconEdit from "./../icons/IconEdit.vue";
import IconTrash from "./../icons/IconTrash.vue";
const popup_store = usePopupStore();
</script>

<template>
  <ul class="list">
    <li v-for="item in popup_store.list" :key="item.id" class="list__item">
      <span>{{ item.title }}</span>
      <div class="list__edit">
        <IconEdit />
      </div>
      <div class="list__delete">
        <IconTrash />
      </div>
    </li>
  </ul>
</template>
<style lang="scss">
.list {
  &__item {
    display: flex;
    justify-content: space-between;
    padding: 0.8rem 1.6rem;
    font-size: 1.6rem;
    color: #555;
    border: 1px solid #ececec;
    span {
      margin-right: auto;
    }
  }
  &__edit {
    margin-right: 0.8rem;
  }
}
</style>
