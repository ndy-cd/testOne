const http = require('http')

const settings = require ('./handler.js')
// console.log(handler);
http.createServer(settings.handler).listen(settings.port)
