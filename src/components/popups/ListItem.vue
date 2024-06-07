<script setup lang="ts">
import { PropType, defineProps, onMounted, ref } from "vue";
import { IList } from "./../../interfaces/popups/IList";
import IconEdit from "./../icons/IconEdit.vue";
import IconTrash from "./../icons/IconTrash.vue";
import CheckboxCustom from "./../ui/CheckboxCustom.vue";
const props = defineProps({
  item: Object as PropType<IList>,
  index: Number,
});
const active = ref(false);

onMounted(() => {
  console.log(props.item, "props.item");
});
</script>

<template>
  <li class="list-item">
    <div class="list-item__check">
      <CheckboxCustom
        :label="item.title"
        :name="`checkbox-${index}`"
        :id="`checkbox-${index}`"
        v-model:checked="active"
      />
    </div>
    <button class="list-item__edit">
      <IconEdit />
    </button>
    <button class="list-item__delete">
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
  &__check {
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
