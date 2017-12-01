var delfi = require("./index.js")

setInterval(function(){
    delfi(function(err, data){
       if(!err){
           console.log(data)
       }
    })



}, 10000)