// var express = require('express')
// var app = express();
// var fs = require('fs')
// var http = require('http').createServer(app);
// app.get('/send', async(req, res) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');

//     function read() {
//         return new Promise((resolve, rejects) => {
//             fs.readFile('./1.jpg', function(err, data) {
//                 resolve(data)
//                 rejects(err)
//             })
//         })
//     }
//     let data = await read()
//     res.send(data)
// })
// http.listen(8888, () => {
//     console.log('listening on *:8888');
// });

var http = require('http');
var url = require('url');
var fs = require('fs');

var server = http.createServer(function(req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/plain; charset=utf-8',
        'Access-Control-Allow-Origin': '*'
    });

    var pathname = url.parse(req.url, true).pathname;
    if (pathname == '/index') {
        const data = fs.readFileSync('./1.jpg');

        res.write(data);
        res.end();
    }
})

server.listen(8888, function() {
    console.log('listening on *:8888');
})
