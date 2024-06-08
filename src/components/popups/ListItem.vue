<script setup lang="ts">
import { PropType, defineProps, onMounted, ref } from "vue";
import { IList } from "./../../interfaces/popups/IList";
import IconEdit from "./../icons/IconEdit.vue";
import IconTrash from "./../icons/IconTrash.vue";
import { usePopupStore } from "../../stores/popup-store";
import useAddToLocalStorage from "../../hooks/useAddToLocalStorage";
const popup_store = usePopupStore();
const props = defineProps({
  item: Object as PropType<IList>,
  index: Number,
});
const active = ref(false);
const edit_mode = ref(false);
const input_ref = ref(null);

async function onDelete(id: number) {
  popup_store.list = popup_store.list.filter((item) => item.id !== id);
  useAddToLocalStorage(popup_store.list);
}
function onEdit() {
  edit_mode.value = true;
  setTimeout(() => {
    input_ref.value.focus();
  }, 100);
}
function onBlur(id: number) {
  const index = popup_store.list.findIndex((item) => item.id === id);
  popup_store.list[index].title = props.item.title;
  console.log(popup_store.list[index].title, "popup_store.list[index].title");
  useAddToLocalStorage(popup_store.list);
  edit_mode.value = false;
}
</script>

<template>
  <li class="list-item">
    <input
      ref="input_ref"
      @blur="onBlur(item.id)"
      class="list-item__input"
      v-if="edit_mode"
      type="text"
      :name="`input-${index}`"
      v-model="item.title"
    />
    <div v-else class="list-item__title">
      {{ item.title }}
    </div>
    <button @click="onEdit" class="list-item__edit">
      <IconEdit />
    </button>
    <button @click="onDelete(item.id)" class="list-item__delete">
      <IconTrash />
    </button>
  </li>
</template>
<style lang="scss">
.list-item {
  display: flex;
  justify-content: space-between;
  padding: 0.8rem 1.6rem;
  font-size: 1.6rem;
  color: #555;
  border: 1px solid #ececec;
  &__input,
  &__title {
    margin-right: auto;
  }
  &__edit,
  &__delete {
    background: transparent;
    border: none;
    cursor: pointer;
  }
  &__edit {
    margin-right: 0.2rem;
  }
}
</style>
