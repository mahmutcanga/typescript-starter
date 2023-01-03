# Module 5: Building REST API

This module will introduce a challenge to connect all previous modules to build a REST API.

## 🤨 Challenge #1

Selecting a good web framework to fill the needs is going to be an ongoing struggle. Here are some popular web frameworks that can help build a REST API.

Basically, all these frameworks takes this below simple idea and iterate on for rich features:

```typescript
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
```

If you prefer to build on top of others work, here are some starting points:

- [Express](https://expressjs.com/)
- [Koa](https://koajs.com/)
- [Nest](https://nestjs.com/)
- [Next](https://nextjs.org/)
- [Hapi](https://hapi.dev/)

## 🤨 Challenge #2

Now that you built an API and serving some data, can you connect this to `BankAccountService` and provide full functionality?

Endpoints expected to response:

- GET /bank-accounts/{owner}
- POST /bank-accounts
- PUT /bank-accounts/{owner}

## 🤨 Challenge #3

Your endpoints work and you are able to serve to your customers. However, when someone restarts your API, all your data is vanished.

Can you replace the storage without changing and breaking any of the contracts?
