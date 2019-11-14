const fs = require('fs');


function _handler(req, res) {
    res.writeHead(200)
    fs.readFile('./doc.txt', (err, data) => {
        if(err) {
            res.writeHead(500);
            res.end(err);
            return;
        }
        res.writeHead(200);
        res.end('Hello fckn world\n
                <p>OK</p>' + req.url + data)
        })
    // setTimeout(() => {res.end('Hello fckn world\n' + req.url)}, 5000);
    
}

module.exports = {
    handler: _handler,
    port: 4240
}
