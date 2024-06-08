<script setup lang="ts">
import Search from "./components/popups/Search.vue";
import List from "./components/popups/List.vue";
import { usePopupStore } from "./stores/popup-store";
import { onMounted } from "vue";

const popup_store = usePopupStore();

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
  //
}
onMounted(() => {
  console.log("mounted");

  chrome.storage.sync.get(["todo-ext"]).then((result) => {
    console.log(result, "result");
    console.log(result['todo-ext'], "result['todo-ext']");
    console.log("Value is " + result.key);
    popup_store.list = JSON.parse(result['todo-ext']) || [];
  });
});
</script>
<template>
  <div class="popup">
    <header class="popup__header">
      <span class="popup__title">Todo App</span>
      <a href="#" @click.prevent="onImport" class="popup__link">Import</a>
      <a href="#" @click.prevent="onExport" class="popup__link">Export</a>
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
