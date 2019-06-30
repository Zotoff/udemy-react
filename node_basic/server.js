const http = require('http');
const fs = require('fs');

let html = fs.readFileSync('./index.html');

http.createServer((req, res) => {
    if(req.url === "/") {
        res.writeHead(200, {'Content-type': 'text/html'});
        let HTML = fs.readFileSync('./index.html');
        res.end(html);
    }else if(req.url === "/user") {
        res.writeHead(200, {'Content-type': 'text/html'});
        let user = fs.readFileSync('./user.html');
        res.end(user);
    } else {
        res.writeHead(404);
        res.end(;)
    }
}).listen(8181, '127.0.0.1');