const fs = require('fs');

var doc = fs.readFileSync('./doc.txt');

function _handler(req, res) {
    res.writeHead(200)
    fs.readFile('newFolder/template.html', (err, data) => {
        if(err) {
            res.writeHead(500);
            res.end(err);
            return;
        }
        res.writeHead(200);
        var result = String(data).replace('Insert Here', doc);

        res.end(result);
        })    
}

module.exports = {
    handler: _handler,
    port: 4240
}
