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
    console.log("hello world")
  }

  const userAction = async (url, year) => {
    var realUrl = "http://archive.org/wayback/available?url=" + url +"&timestamp="+year+ "0101"

    const response = await fetch(realUrl);
    const bodyJson = await response.json(); 
    if(bodyJson.archived_snapshots.closest.status == 200){
            return bodyJson.archived_snapshots.closest.url
        }
    return url
  }
  (async () => {
    console.log(await userAction("Facebook.com", "2006"))
  })()