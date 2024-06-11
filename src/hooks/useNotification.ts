export default function useNotification(title: string, message: string) {
  let optionNotif = {
    type: "basic",
    title,
    message,
    iconUrl: "icons/icon-32.png",
  };
  chrome.notifications.create(optionNotif);
}
