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
        if (req.url != "/favicon.ico"){
            if (req.method == "POST"){
                //console.log('Need to post!' + req.url);
                fs.writeFileSync('./request.txt', doc);
                res.end();
            }
            if (req.method == "GET"){
                //console.log('Need to get!' + req.url);
                res.end(result);
            }
        }
        res.end();
        })    
}

module.exports = {
    handler: _handler,
    port: 4240
}
