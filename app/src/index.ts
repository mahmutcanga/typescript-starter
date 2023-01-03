export function echo(message: string) {
    return `Hello, ${message}!`;
}

import http, { IncomingMessage, ServerResponse } from 'http';

const requestListener = function (request: IncomingMessage, response: ServerResponse) {
    console.log('Incoming request', request.url);
    response.writeHead(200);
    response.end('Hello, World!');
};

console.log('Starting server');

const server = http.createServer(requestListener);
server.listen(8080);

console.log('Server started at http://localhost:8080');
