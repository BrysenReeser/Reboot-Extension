chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "loading") {
    // get status of page on wayback api
    let waybackStatus = true;

    if (waybackStatus) {
      chrome.tabs.insertCSS(tabId, {
        file : "generatedCss.css"
      }, () => {
        console.log("Inserted");
      })
    }
  }
})