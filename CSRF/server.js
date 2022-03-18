const http = require('http');

const server = http.createServer((req, res) => {
  console.log(req.headers)
  console.log(req.headers.cookie)
	res.write('Hello\n');
  res.end();
});

server.listen(9527, () => {
	console.log('Web Server started at port 9527');
});