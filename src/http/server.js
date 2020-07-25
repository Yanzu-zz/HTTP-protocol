const http = require('http')

const port = 8888

http.createServer((request, response) => {
  console.log('request come', request.url)

  response.end('Simple Server has been created!')
}).listen(port)

console.log(`server listening on ${port}`)
