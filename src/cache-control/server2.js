// 缓存验证 Last-Modified 和 Etag 的使用
// https://www.imperva.com/learn/performance/cache-control/
const fs = require('fs')
const http = require('http')

const port = 8888

http.createServer((request, response) => {
  console.log('request come', request.url)

  if (request.url === '/') {
    const html = fs.readFileSync('./test.html', 'utf8')
    response.writeHead(200, {
      'Content-Type': 'text/html'
    })
    response.end(html)
  }

  if (request.url === '/script.js') {
    response.writeHead(200, {
      'Content-Type': 'text/javascript',
      // The no-cache directive means that a browser may cache a response, but must first submit a validation request to an origin server.
      // 'Cache-Control': 'max-age=200000, no-cache',
      // The no-store directive means browsers aren’t allowed to cache a response and must pull it from the server each time it’s requested. This setting is usually used for sensitive data, such as personal banking details.
      'Cache-Control': 'max-age=200, no-store',
      'Last-Modified': '123',
      'Etag': '777'
    })

    const etag = request.headers['if-none-match']
    // 如果 etag 没变的话，就说明内容没变，直接读缓存就行
    if (etag === '777') {
      response.writeHead(304, {
        'Content-Type': 'text/javascript',
        'Cache-Control': 'max-age=200000, no-cache',
        'Last-Modified': '123',
        'Etag': '777'
      })

      response.end('modified')
    } else {
      response.writeHead(200, {
        'Content-Type': 'text/javascript',
        'Cache-Control': 'max-age=200000, no-cache',
        'Last-Modified': '123',
        'Etag': '777'
      })

      response.end('console.log("script loaded twice22212")')
    }
  }
}).listen(port)

console.log(`server listening on ${port}`)