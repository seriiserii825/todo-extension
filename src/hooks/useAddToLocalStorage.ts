import {IList} from "../interfaces/popups/IList";

export default function useAddToLocalStorage(value: IList[] | null) {
  if (!value) {
    return;
  }
  chrome.storage.sync.set({ "todo-ext": JSON.stringify(value) }).then(() => {
    console.log("Value is set");
  });
}
