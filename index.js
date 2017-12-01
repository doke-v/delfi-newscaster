var news = []

module.exports = function (callback) {
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
        var link = $("div.md-mosaic-title .md-scrollpos").eq(0).attr('href');
       
            link = link.replace('http://m.', 'http://');

            var uudis = {
                headline: headline,
                link: link,
                comments: comments
            }

            while (news.length > 10) {
                news.shift()
            }
            if (news.length < 1) news.push(link)

            if (news.indexOf(link) >= 0) {
                return;
            } else {
                news.push(link)
                callback(null, uudis)
            }
       
     }  
     else {
         callback(error)
     }

    })
}