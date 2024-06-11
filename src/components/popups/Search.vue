<script setup lang="ts">
import { ref } from "vue";
import { usePopupStore } from "../../stores/popup-store";
import useAddToLocalStorage from "../../hooks/useAddToLocalStorage";
import useNotification from "../../hooks/useNotification";
const popup_store = usePopupStore();
const search = ref("");
const search_ref = ref(null);

function onSubmit() {
  if (search.value.trim() === "") return;
  popup_store.list.push({
    id: Date.now().toString(),
    title: search.value,
    completed: false,
  });
  useAddToLocalStorage(popup_store.list);
  useNotification('Todo Search', `Todo "${search.value}" added successfully!`)
  search.value = "";
  search_ref.value.focus();
}
</script>

<template>
  <div class="search">
    <input
      ref="search_ref"
      :tabindex="1"
      type="text"
      placeholder="Enter todo..."
      name="search"
      v-model="search"
    />
    <button :tabindex="2" @click="onSubmit">Add new</button>
  </div>
</template>
<style lang="scss">
.search {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4rem;
  border: 1px solid #ececec;
  border-radius: 4px;
  input {
    flex: 1;
    text-indent: 1rem;
    height: 100%;
    border: none;
    &::placeholder {
      text-indent: 1rem;
      color: #b3b3b3;
    }
  }
  button {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
    font-size: 1.6rem;
    font-weight: 500;
    height: 100%;
    color: white;
    background: var(--accent);
    border: 1px solid var(--accent);
    cursor: pointer;
    transition: all 0.4s;
    &:hover {
      color: var(--accent);
      background: white;
    }
  }
}
</style>
