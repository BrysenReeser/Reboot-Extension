// js file for project
navigator.serviceWorker.register('background.js').then(x=>console.log('done', x))
BackInTime.addEventListener("click", async () => {
    var myAudio = new Audio(chrome.runtime.getURL("80sRiff.wav"));
    myAudio.play();
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
  retroButton.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: retroPage,
    });
  });
  
  // The body of this function will be executed as a content script inside the
  // current page
  function rebootPage() {
    var myAudio = new Audio(chrome.runtime.getURL("80sRiff.wav"));
    myAudio.play();
    var element = document.querySelector('#insertedStylesheet');
    if (element) {
      element.parentElement.removeChild(element);
      console.log("Unbooted");
    } else {
      document.head.insertAdjacentHTML('beforeend',
      '<link id="insertedStylesheet" rel="stylesheet" type="text/css" href="' + 
              chrome.runtime.getURL("fallBack.css") + '">'
      );
      console.log("Rebooted");
    }
  }
  function retroPage() {
    var myAudio = new Audio(chrome.runtime.getURL("80sRiff.wav"));
    myAudio.play();
    var element = document.querySelector('#insertedStylesheet');
    if (element) {
      element.parentElement.removeChild(element);
      console.log("Unbooted");
    } else {
      document.head.insertAdjacentHTML('beforeend',
      '<link id="insertedStylesheet" rel="stylesheet" type="text/css" href="' + 
              chrome.runtime.getURL("fallBack.css") + '">'
      );
      console.log("Rebooted");
    }
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
