<script setup lang="ts">
import { ref } from "vue";
import Search from "./components/popups/Search.vue";
import List from "./components/popups/List.vue";
import { usePopupStore } from "./stores/popup-store";
import { onMounted } from "vue";
import useGetFromLocalStorage from "./hooks/useGetFromLocalStorage";
import useAddToLocalStorage from "./hooks/useAddToLocalStorage";

const popup_store = usePopupStore();
const file_ref = ref(null);

function onExport() {
  console.log(popup_store.list, "popup_store.list");
  const blob = new Blob([JSON.stringify(popup_store.list)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const file_name = `export.json`;
  //@ts-ignore
  chrome.downloads.download({
    url: url,
    filename: file_name,
    saveAs: true,
  });
}
function onImport() {
  const file = file_ref.value.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      //@ts-ignore
      const fileContents = e.target.result;
      //@ts-ignore
      const data = JSON.parse(fileContents);
      popup_store.list = data;
      useAddToLocalStorage(data);
    };
    //@ts-ignore
    const result = reader.readAsText(file);
  }
}
onMounted(async () => {
  popup_store.list = await useGetFromLocalStorage();

});
</script>
<template>
  <div class="popup">
    <header class="popup__header">
      <span class="popup__title">Todo App</span>
      <!-- <button class="popup__import"> -->
      <!--   <span>Import</span> -->
      <!--   <input @change="onImport" ref="file_ref" type="file" id="fileInput" /> -->
      <!-- </button> -->
      <!-- <a href="#" @click.prevent="onExport" class="popup__link">Export</a> -->
    </header>
    <div class="popup__search">
      <Search />
    </div>
    <div class="popup__list">
      <List />
    </div>
  </div>
</template>
<style lang="scss">
#app {
  padding: 3.2rem;
  width: 380px;
  min-height: 40rem;
  border-radius: 16px;
  border: 1px solid #ececec;
  box-shadow: 0 3.2rem 6.4rem 0 rgba(0, 0, 0, 0.05);
}
.popup {
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.6rem;
    font-size: 1.6rem;
    font-weight: bold;
  }
  &__title {
    margin-right: auto;
  }
  &__import {
    position: relative;
    background: transparent;
    border: none;
    cursor: pointer;
    input {
      position: absolute;
      top: 0;
      left: 0;
      display: block;
      width: 100%;
      height: 100%;
      opacity: 0;
      cursor: pointer;
    }
    span {
      pointer-events: none;
      color: var(--contrast);
    }
  }
  &__link {
    margin-left: 1.6rem;
    text-decoration: none;
    color: var(--contrast);
    &:last-of-type {
      color: var(--accent);
    }
  }
  &__search {
    margin-bottom: 1.6rem;
  }
}
</style>
