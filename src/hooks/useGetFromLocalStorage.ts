export default async function useGetFromLocalStorage() {
  const result = await chrome.storage.sync.get(["todo-ext"]);
  return JSON.parse(result["todo-ext"]) || [];
}

