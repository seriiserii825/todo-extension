export default async function useGetFromLocalStorage() {
  const result = await chrome.storage.sync.get(["todo-ext"]);
  if (!result["todo-ext"]) {
    return [];
  }
  return JSON.parse(result["todo-ext"]);
}

