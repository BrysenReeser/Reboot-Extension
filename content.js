// js file for project
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
    // perform reboot page logic 
  }