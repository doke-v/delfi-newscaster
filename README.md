**delfi-newscaster**
----------------
Simple announcer for Estonian news portal [delfi.ee](http://www.delfi.ee). If top headline changes, the user gets an object with relevant details (headline, url, comment count).

**Installation**
----------------

    $ npm install delfi-newscaster

**Usage example**
---------
```javascript
    const delfi = require("delfi-newscaster")
    
    delfi(function(err, data) {
    console.log(data.headline) // =>  Kohtuotsus võib sundida sadu kliente hanitanud Swedbanki vastutama
    })
```    


**API**
---
```javascript
delfi(callback, interval)
``` 
**callback**
*Required*
Type: `function`  

Callback function which returns either error or data (error-first callback)



**interval**
*Optional*
Type: `number`

Time between requests, in milliseconds. If not provided then default interval is set to 120000 ms (120 seconds)



**Licence**
-------
[MIT](http://vjpr.mit-license.org)