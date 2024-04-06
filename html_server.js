// accessing my docode server from the browser at the URL: http://web-l129d2b21-b834.docode.us.qwasar.io

function start_html_server() {
    const http = require('http');
    const fs = require('fs');
    const path = require('path');

    const hostname = '0.0.0.0';
    const port = 8080;

    const server = http.createServer(function(request, response) {
        let filePath = '.' + request.url;
        if (filePath === './') {
            filePath = './index.html';
        }

        const extname = path.extname(filePath);
        let contentType = 'text/html';
        switch (extname) {
            case '.js':
                contentType = 'text/javascript';
                break;
            case '.css':
                contentType = 'text/css';
                break;
        }

        fs.readFile(filePath, function(error, content) {
            if (error) {
                if (error.code == 'ENOENT') {
                    response.writeHead(404);
                    response.end('404 Not Found');
                } else {
                    response.writeHead(500);
                    response.end('500 Internal Server Error: ' + error.code);
                }
            } else {
                response.writeHead(200, { 'Content-Type': contentType });
                response.end(content, 'utf-8');
            }
        });
    }).listen(port, hostname, () => {
        console.log("Server running at http://web-l129d2b21-b834.docode.us.qwasar.io");
    });
}

start_html_server();