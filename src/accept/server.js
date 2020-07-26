// 数据协商（客户端告诉服务端支持什么类型，服务端可能按照传来的格式返回）
const fs = require('fs')
const http = require('http')
const zlib = require('zlib')

const port = 8888

http.createServer((request, response) => {
  console.log('request come', request.url)

  const html = fs.readFileSync('./test.html')

  response.writeHead(200, {
    'Content-Type': 'text/html',
    // 禁止服务器主动预测返回数据的格式（如纯文本转为脚本格式），现在很少用了
    'X-Content-Type-Options': 'nosniff',
    'Content-Encoding': 'gzip'
  })
  response.end(zlib.gzipSync(html))

}).listen(port)

console.log(`server listening on ${port}`)