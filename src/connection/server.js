// HTTP 长连接
const fs = require('fs')
const http = require('http')

const port = 8888

http.createServer((request, response) => {
  console.log('request come', request.url)

  const html = fs.readFileSync('./test.html', 'utf8')
  const img = fs.readFileSync('./test.jpg')

  if (request.url === '/') {
    response.writeHead(200, {
      'Content-Type': 'text/html',
      // 默认是 keep-alive，close 就是关闭长连接，即每次请求完后关闭这个 http request
      // 还是建议用 keep-alive，毕竟可以节省很多加载时间
      // 'Connection': 'close'
      'Connection': 'keep-alive'
    })
    response.end(html)
  } else {
    response.writeHead(200, {
      'Content-Type': 'image/jpg',
      // 而 http/2 就是用一个 http request 就可以加载全部资源（同域的才能）
      'Connection': 'keep-alive'
    })
    response.end(img)
  }

}).listen(port)

console.log(`server listening on ${port}`)