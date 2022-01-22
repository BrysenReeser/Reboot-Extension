
var fetch = require('node-fetch');
// npm i node-fetch@2

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