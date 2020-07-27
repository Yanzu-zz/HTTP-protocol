const fs = require('fs')
const http = require('http')

const port = 8888

http.createServer((request, response) => {
  console.log('request come', request.url)

  const host = request.headers.host

  if (request.url === '/') {
    const html = fs.readFileSync('./test.html', 'utf8')

    if (host === 'a.test.com') {
      response.writeHead(200, {
        'Content-Type': 'text/html',
        // 可以用数组写法传输多个 Cookie
        // max-age 是多少秒后失效，而 expires 参数是设置在“哪个时间点”失效
        // 加了 HttpOnly 参数的 cookie 就不能用 document.cookie 访问到
        // 不能跨域去设置 cookie
        // 设置好 domain 就可以让 xxxx.com 下面的所有子域名访问到 xxxx.com 的cookie
        'Set-Cookie': [
          'id=123; max-age=3',
          'abc=456; HttpOnly',
          'name=lili; domain=test.com'
        ]
      })
    }

    response.end(html)
  }

}).listen(port)

console.log(`server listening on ${port}`)