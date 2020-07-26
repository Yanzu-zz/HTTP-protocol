// redirect 重定向
const fs = require('fs')
const http = require('http')

const port = 8888

http.createServer((request, response) => {
  console.log('request come', request.url)

  // 301 为 永久跳转，你能明确的确定该页面永久地会在 /new 页面时用，下次浏览器会自动跳转，不需要再次请求服务器知道新地址
  // 301 缓存要慎重使用，因为浏览器会写入 disk 缓存，除非你主动清楚，否则会一直重定向
  // 302 为 临时跳转，即下次跳转的可能是 /fresh 页面，不是永久的确定
  if (request.url === '/') {
    response.writeHead(302, {
      // 跳转到 同域的/new 页面，但如果 status code 不是 302，就不会跳转
      // 但是这样会瞬间跳转，没有提示
      'Location': '/new'
    })

    response.end()
  }

  if (request.url === '/new') {
    response.writeHead(200, {
      'Content-Type': 'text/html'
    })

    response.end('<div>This is contents</div>')
  }

}).listen(port)

console.log(`server listening on ${port}`)