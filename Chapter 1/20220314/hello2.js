const http = require('http'); // import 같은 느낌?

const server = http.createServer((req, res) => { //(요청, 응답)
    res.writeHead(200, { 'Content-Type' : 'text/html'});
    res.end('<h1>Hello Node</h1>')
});

server.listen(8000);

//서버 코드가 수정되면 서버를 재시동해야한다.