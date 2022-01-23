// js file for project
navigator.serviceWorker.register('background.js').then(x=>console.log('done', x))
BackInTime.addEventListener("click", async () => {
    console.log("button clicked!");
    chrome.runtime.sendMessage({ greeting: "hello" }, function (response) {});
  });
rebootButton.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: rebootPage,
    });
  });
  
  // The body of this function will be executed as a content script inside the
  // current page
  function rebootPage() {
  }
