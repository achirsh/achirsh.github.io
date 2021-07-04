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
var path = require('path');
var crypto = require('crypto');

var server = http.createServer(function(req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/plain; charset=utf-8',
        'Access-Control-Allow-Origin': '*'
    });

    var path = url.parse(req.url, true);
    if (path.pathname == '/index') {
        const video = fs.readFileSync('./demo.mp4');
        const length = video.length;
        let result = '';
        for (let i = 0; i < length; i++) {
            const binStr = Number(video[i]).toString(2);
            result += '0'.repeat(8 - binStr.length) + binStr;
        }

        const demo = fs.readFileSync('./')

        res.write(result.toString());
        res.end();
    }

    if (path.pathname == '/medium.m3u8') {
        const { key } = path.query
        const value = Buffer.from(key, 'base64').toString('utf-8')
        if (value == 'hello') {
            const file = fs.readFileSync('./demo.m3u8');
            res.write(Buffer.from('https://achirsh.github.io/videos/demo.m3u8').toString('base64'));
        } else {
            res.write('');
        }
        res.end();
    }
})

server.listen(8888, function() {
    console.log('listening on *:8888');
})
