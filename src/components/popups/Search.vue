<script setup lang="ts">
import { ref } from "vue";
const search = ref("");
</script>

<template>
  <div class="search">
    <input
      type="text"
      placeholder="Enter todo..."
      name="search"
      v-model="search"
    />
    <span>Add new</span>
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
  span {
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
    transition: all .4s;
    &:hover {
      color: var(--accent);
      background: white;
    }
  }
}
</style>
