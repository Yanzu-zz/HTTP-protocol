// Content-Security-Policy 内容安全策略
// 作用：限制资源获取、报告资源获取越权
const fs = require('fs')
const http = require('http')

const port = 8888

const wait = (seconds) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, seconds * 1000)
  })
}

// 简洁写法
const wait2 = s => new Promise(r => setTimeout(r, s * 1000))

http.createServer(async (request, response) => {
  console.log('request come', request.url)
  console.log('get host: ', request.headers.host)

  const html = fs.readFileSync('test.html', 'utf-8')

  if (request.url === '/') {
    response.writeHead(200, {
      'Content-Type': 'text/html'
    })

    response.end(html)
  }

  if (request.url === '/data') {
    response.writeHead(200, {
      // s-maxage 专门为代理缓存用的
      // privata 意思是只能由浏览器进行缓存
      // no-store 就是所有东东都不能缓存
      // 'Cache-Control': 'max-age=5 s-maxage=20 private'

      'Cache-Control': 's-maxage=200',
      // 只有指定的头值相等的情况才会使用缓存
      'Vary': 'X-Test-Cache'
    })

    // wait(2).then(() => {
    //   response.end('success')
    // })
    await wait2(2)
    response.end('success')
  }
}).listen(port)

console.log(`server listening on ${port}`)