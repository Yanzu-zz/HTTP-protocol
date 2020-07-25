// CORS 跨域请求的限制与解决
const http = require('http')

const port = 8887

http.createServer((request, response) => {
  console.log('request come2', request.url)

  response.writeHead(200, {
    // 加了这个 Header 字段才可以解析跨域请求
    'Access-Control-Allow-Origin': '*',
    // 允许预请求
    'Access-Control-Allow-Headers': 'X-Test-Cors',
    // 允许的http请求
    'Access-Control-Allow-Methods': 'POST,PUT,DELETE',
    // 设置跨域时间在1000秒之内
    'Access-Control-Allow-Max-Age': '1000'
  })

  response.end('server2')
}).listen(port)

console.log(`server listening on ${port}`)