var toHere = "google.com"


chrome.runtime.onMessage.addListener((request, sender, reply) => {
    console.log(toHere)
    chrome.tabs.update({url: toHere});

});

function updateUrl(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var activeTab = tabs[0];
        console.log(activeTab)
        
        const userAction = async (url, year) => {
            var realUrl = "http://archive.org/wayback/available?url=" + url +"&timestamp="+year+ "0101"
        
            const response = await fetch(realUrl);
            const bodyJson = await response.json(); 
            if(bodyJson.archived_snapshots.closest.status == 200){
                    var temp = bodyJson.archived_snapshots.closest.url
                    toHere = bodyJson.archived_snapshots.closest.url
                    return bodyJson.archived_snapshots.closest.url
                }
            return url
          }
          (async () => {

            console.log(await userAction(activeTab.url, "2006"))
          })()

     });
}
chrome.webNavigation.onCompleted.addListener(function(details) {
    updateUrl();
});
chrome.tabs.onActivated.addListener(function(activeInfo) {

   updateUrl();
});
