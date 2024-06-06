// script start after extension install
chrome.runtime.onInstalled.addListener(async () => {
    console.log("extension installed");
});
// chrome.commands.onCommand.addListener((command) => {
//     // tab is active tab
//     chrome.tabs.update({}, async (tab) => {
//         if (command == "tabs-to-buffer") {
//             console.log("extension command: tabs-to-buffer");
//         }
//     });
// })
// ;
