import { ref } from "vue";
import { defineStore } from "pinia";
import {IList} from "../interfaces/popups/IList";

export const usePopupStore = defineStore("popup", () => {
  const list = ref<IList[]>([
    {
      id: 1,
      title: "Learn Vue 3",
      completed: false,
    },
    {
      id: 2,
      title: "Learn Vuex 4",
      completed: false,
    },
    {
      id: 3,
      title: "Learn Vue Router 4",
      completed: false,
    },
    {
      id: 4,
      title: "Learn Vue Test Utils",
      completed: false,
    },
    {
      id: 5,
      title: "Learn Vue CLI",
      completed: false,
    },
  ]);

  return {
    list,
  };
});
