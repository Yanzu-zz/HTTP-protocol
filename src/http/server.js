const http = require('http')

const port = 8888

http.createServer((request, response) => {
  console.log('request come', request.url)

  response.end('123')
}).listen(port)

console.log(`server listening on ${port}`)