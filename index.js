var news = []

module.exports = function delfi(callback, interval) {
    interval = interval || 120000
    

    var request = require("request"),
        cheerio = require("cheerio"),
        url = "http://m.delfi.ee";
    request(url, function (error, response, body) {
     if(!error && response.statusCode == 200 && body){
        var $ = cheerio.load(body, {
            decodeEntities: false
        });


        var headline = $("div.md-mosaic-title .md-scrollpos").eq(0).html();
        var comments = $("div.md-mosaic-title .commentCount").eq(0).html();
        var url = $("div.md-mosaic-title .md-scrollpos").eq(0).attr('href');
       
            url = url.replace('http://m.', 'http://');

            var uudis = {
                headline: headline,
                url: url,
                comments: comments
            }
//keep temporary array short
            while (news.length > 10) {
                news.shift()
            }
//push first url to array            
            if (news.length < 1) news.push(url)
//check if current url exists in array
            if (news.indexOf(url) >= 0) {
//if yes, then stop               
                return;
            } else {
//if no, then push to array and send object to user                
                news.push(url)
                callback(null, uudis)
            }
       
     }  
     else {
         callback(error, null)
     }

    })
    
    setTimeout(function(){
        delfi(callback, interval)
    }, interval)
   
    
}