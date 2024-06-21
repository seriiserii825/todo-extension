<script setup lang="ts">
import { PropType, defineProps, onMounted, ref } from "vue";
import { IList } from "./../../interfaces/popups/IList";
import IconEdit from "./../icons/IconEdit.vue";
import IconTrash from "./../icons/IconTrash.vue";
import { usePopupStore } from "../../stores/popup-store";
import useAddToLocalStorage from "../../hooks/useAddToLocalStorage";
// import useNotification from "../../hooks/useNotification";
const popup_store = usePopupStore();
const props = defineProps({
  item: Object as PropType<IList>,
  index: Number,
});
const active = ref(false);
const edit_mode = ref(false);
const input_ref = ref(null);

async function onDelete(id: number) {
  const ensure = confirm("Are you sure you want to delete this item?");
  if (!ensure) return;
  popup_store.list = popup_store.list.filter((item) => item.id !== id);
  useAddToLocalStorage(popup_store.list);
  // useNotification('Todo item', `Todo item "${props.item.title}" deleted successfully!`)
}
function onEdit() {
  edit_mode.value = true;
  setTimeout(() => {
    input_ref.value.focus();
  }, 100);
}
function onChange() {
  const current_popup = popup_store.list.find((item) => item.id === props.item.id);
  popup_store.list = popup_store.list.filter((item) => item.id !== props.item.id);
  if (current_popup?.completed){
    current_popup.completed = false;
    popup_store.list.unshift(current_popup);
  } else {
    current_popup.completed = true;
    popup_store.list.push(current_popup);
  }
}
function onBlur(id: number) {
  const index = popup_store.list.findIndex((item) => item.id === id);
  popup_store.list[index].title = props.item.title;
  console.log(popup_store.list[index].title, "popup_store.list[index].title");
  useAddToLocalStorage(popup_store.list);
  edit_mode.value = false;
  const title = `Todo item "${popup_store.list[index].title}" updated successfully!`;
  // useNotification(title, '')
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
    <div @click="onChange" v-else class="list-item__title" :class="{'completed': item?.completed}">
      {{ item.title }}
    </div>
    <button v-if="!item?.completed" @click="onEdit" class="list-item__edit">
      <IconEdit />
    </button>
    <button v-if="item?.completed" @click="onDelete(item.id)" class="list-item__delete">
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
  &__title {
    cursor: pointer;
    &.completed {
      text-decoration: line-through;
    }
  
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
