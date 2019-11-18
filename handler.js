const fs = require('fs');
var qs = require('querystring');
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
                var body = '';
                req.on('data', (dat) => {
                    body += dat;                    
                });
                req.on('end', () => {
                    let out = qs.parse(body);
                    fs.writeFile('./request.txt', out.text, (err) => {
                        if (err) throw err;
                        console.log('writeFile callback');
                    });
                });
                res.end();
            }
            if (req.method == "GET"){
                res.end(result);
            }
        }
        });    
}

module.exports = {
    handler: _handler,
    port: 4240
}
