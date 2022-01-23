var toHere = "google.com"
var rewind = true
var lastModernUrl = "https://yahoo.com"

chrome.runtime.onMessage.addListener((request, sender, reply) => {
        if(rewind) {
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

