var toHere = "google.com"
var rewind = true
var lastModernUrl = "https://www.google.com"

chrome.runtime.onMessage.addListener((request, sender, reply) => {
        console.log(request)
        if(request == "Rewind this page!" && rewind == false) {
            console.log("exit error")
            rewind = false;
            return lastModernUrl;
        }else if(rewind) {
            rewind = false;
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                var activeTab = tabs[0];
                console.log(activeTab)
                
                const userAction = async (url, year) => {
                     console.log("url: " + url)  
                     console.log("lastModernUrl: " + lastModernUrl)
                    var realUrl = "http://archive.org/wayback/available?url=" + url +"&timestamp="+year+ "0101"
                
                    const response = await fetch(realUrl);
                    const bodyJson = await response.json(); 
                    if(bodyJson.archived_snapshots.closest.status == 200){
                            chrome.tabs.update({url:bodyJson.archived_snapshots.closest.url})
                            lastModernUrl = url
                            toHere = bodyJson.archived_snapshots.closest.url
                            return bodyJson.archived_snapshots.closest.url
                        }
                    return url
                  }
                  (async () => {
                    var j = await userAction(activeTab.url, "2005")
                    
                    console.log(j)
                  })()
        
             });
            
        }else {
            rewind = true;
            chrome.tabs.update({url:lastModernUrl})
        }

});
// chrome.webNavigation.onDOMContentLoaded.addListener(function(details) {

//   retroPage()
  
// });

//   chrome.webNavigation.onCompleted.onReferenceFragmentUpdated(function(details) {
//     if (changeInfo.status == 'complete') {

//     retroPage()
//     }
//   });


//   function retroPage() {

//       document.head.insertAdjacentHTML('beforeend',
//       '<link id="insertedStylesheet" rel="stylesheet" type="text/css" href="' + 
//               chrome.runtime.getURL("bar.css") + '">'
//       );

//       console.log("Rebooted");
    
//   }
