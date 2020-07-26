// Content-Security-Policy 内容安全策略
// 作用：限制资源获取、报告资源获取越权
const fs = require('fs')
const http = require('http')

const port = 8888

http.createServer((request, response) => {
  console.log('request come', request.url)

  const html = fs.readFileSync('test.html', 'utf-8')
  
  if (request.url === '/') {
    response.writeHead(200, {
      'Content-Type': 'text/html',
      // 我们规定只能通过 http 和 https 的方式加载资源（这样就不能执行直接写在文件里的 js 脚本代码了，防止 xss 攻击）
      // 全部资源，包括图片资源也一样被限制了
      // 'Content-Security-Policy': 'default-src http: https:'

      // 这里我们限制了网页只能加载本域名下的资源，以及一个指定域名下的资源
      // 'Content-Security-Policy': 'default-src \'self\' https://cdn.bootcdn.net'
      
      // 这样就不会限制除 script 资源以外的资源加载了
      // 'Content-Security-Policy': 'script-src \'self\''

      // form-action 限制表单的功能，这里表示只能对 本站 进行操作，不能跳转至其他页面
      // 还有其它安全参数格式都差不多，需要用的时候再去网上搜即可
      // 注意多个参数间以 ; 隔开
      // 'Content-Security-Policy': 'default-src \'self\';form-action \'self\''

      // 加了 report-uri 就可以 当出现限制请求时，它会主动汇报，位置就是指定的 /report
      // Content-Security-Policy-Only 表示允许加载资源，但会主动报告
      'Content-Security-Policy-Only': 'default-src \'self\'; report-uri /report'
    })

    response.end(html)
  } else {
    response.writeHead(200, {
      'Content-Type': 'application/javascript'
    })

    response.end('console.log("loaded script")')
  }
}).listen(port)

console.log(`server listening on ${port}`)