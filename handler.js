const fs = require('fs');


function _handler(req, res) {
    res.writeHead(200)
    fs.readFile('.' + req.url, (err, data) => {
        if(err) {
            res.writeHead(500);
            res.end(err);
            return;
        }
        res.writeHead(200);
        res.end(data);
        })    
}

module.exports = {
    handler: _handler,
    port: 4240
}
