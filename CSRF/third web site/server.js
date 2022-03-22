const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`)
  if (url.pathname === '/test.jpg') {
    const img = fs.readFileSync('./test.jpg')
    res.writeHead(200, {
      'Content-Type': 'image/jpeg',
      // 'Access-Control-Allow-Origin': req.headers.origin||'',
      // 'Access-Control-Allow-Credentials': true,
    })
    console.log(req.headers.origin)
    console.log(req.headers)
    res.end(img)
  } else {
    console.log(req.headers)
    console.log(req.headers.cookie)
    res.write('Hello\n')
    res.end()
  }
})

server.listen(9527, () => {
  console.log('Web Server started at port 9527')
})
