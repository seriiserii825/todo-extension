import { IList } from "../interfaces/popups/IList";

export default async function useAddToLocalStorage(value: IList[] | null) {
  if (!value) {
    return;
  }
  await chrome.storage.sync.set({ "todo-ext": JSON.stringify(value) });
}
