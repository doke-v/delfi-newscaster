var news = []

module.exports = function delfi(callback, interval) {
    interval = interval || 60000
    callback = callback || console.log

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

            while (news.length > 10) {
                news.shift()
            }
            if (news.length < 1) news.push(url)

            if (news.indexOf(url) >= 0) {
                return;
            } else {
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