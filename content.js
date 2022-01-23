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
    /*
    var vaporwaveElement = document.querySelector("#insertVaporwaveStylesheet");
    var vaporwaveWrapper = document.querySelector("#window");
    */
    if (element) {
      element.parentElement.removeChild(element);
      /*
      vaporwaveElement.parentElement.removeChild(vaporwaveElement);
      vaporwaveWrapper.parentElement.removeChild(vaporwaveWrapper);
      */
      console.log("Unbooted");
    } else {
      document.head.insertAdjacentHTML('beforeend',
      '<link id="insertedStylesheet" rel="stylesheet" type="text/css" href="' + 
              chrome.runtime.getURL("fallBack.css") + '">'
      );
      /*
      // Windows 95ing in progress
      document.head.insertAdjacentHTML('beforeend',
      '<link id="insertVaporwaveStylesheet" rel="stylesheet" type="text/css" href="' + 
              chrome.runtime.getURL("vaperwaveBorder.css") + '">'
      );
      document.body.insertAdjacentHTML('afterbegin',
      '<div class="window" style="z-index: 10000; position: sticky; top:0; width: auto; background: rgb(192, 192, 192);"><div class="inner"><div class="header header-draggable noselect"><div class="icon"></div>Reboot Vaporwave<div class="buttons"><button ontouchstart="" class="noselect button-minimize"><span></span></button> <button ontouchstart="" class="noselect button-maximize"><span></span></button></div></div><div class="menu-bar noselect"><div class="row no-gutters"><div class="col"><div class="action"><a role="button" tabindex="0"><u>R</u>eboot</a></div><div class="action"><a role="button" tabindex="1"><u>R</u>ewinde</a></div><div class="action"><a role="button" tabindex="2"><u>R</u>asterize</a></div><div class="action"><a role="button" tabindex="3"><u>V</u>aporwave</a></div></div></div></div>'
      );
      document.body.insertAdjacentHTML('beforeend',
      '<div class="statusbar row no-gutters"><div class="col cell">Vaporwave: 100%</div><!----></div></div></div>'
      );
      */
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
