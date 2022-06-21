const http = require('http')
const cookie = require('cookie')

const server = http.createServer(function(req, res){
  console.log('req.url:', req.url)
  console.log('req.headers.cookie:', req.headers.cookie)

  // 쿠키 생성
  res.writeHead(200, {'Set-Cookie':`Permanent_cookie=cookieValue; Max-Age=${60*60*24*30}`});

  // cookie 파싱
  let cookies = {}
  if(req.headers.cookie !== undefined){
    cookies = cookie.parse(req.headers.cookie)
    console.log(cookies)    
  }else{
    console.log('전달된 쿠키가 없습니다.')
  }
  res.end('<h1>Cookie Test</h1>');
}).listen(3000, ()=>console.log('3000 포트에서 대기중'));