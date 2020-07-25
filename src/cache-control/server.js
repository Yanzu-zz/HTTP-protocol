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
      // 加上 max-age 参数就可以对资源进行缓存（默认内存缓存，不持久）
      // Cache-Control 还有很多的参数配置，不单单只有 max-age
      'Cache-Control': 'max-age=200, public'
    })
    response.end('console.log("script loaded twice22212")')
  }
}).listen(port)

console.log(`server listening on ${port}`)