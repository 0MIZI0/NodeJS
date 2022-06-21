const http = require('http');
const fs = require('fs/promises');

const baseURL = 'http://localhost:3000/'

const server = http.createServer(function(req, res){
    if(req.url === '/favicon.ico') return;        // 파비콘 요청 무시
    console.log('req.url : ', req.url, 'req.method : ', req.method);
  
    // <1> req.url을 파싱하여 객체로 저장 -> URLSearchParams 객체 저장
    const parsedURL = new URL(req.url, baseURL);
    console.log('parsedURL :' , parsedURL)
    const sp = parsedURL.searchParams;
    console.log('sp : ', sp);           // { num1: '1', num2: '100' }
  
    // <2> 변수 num1, num2에 searchParams의 num1, num2값을 정수로 변환하여 저장
    let num1 = parseInt(sp.get('num1'));
    let num2 = parseInt(sp.get('num2'));
    console.log(`num1 : ${num1}, num2 : ${num2}`);
  
    // <3> num1, num2에 잘못된 값이 들어있으면 400 Bad Request 에러 코드 전송
    if( Number.isNaN(num1) || Number.isNaN(num2) ){
      res.statusCode = 400;  // 400 Bad Request
      res.end('<h1>Bad Request</h1>');
    }else{
      let sum = 0;
      for(let i = parseInt(num1); i <= parseInt(num2); i++) sum += i;
      res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
      res.end(`<h1>${num1} ~ ${num2}의 합계: ${sum}</h1>`);
    }
  }).listen(3000, ()=> console.log('3000 포트에서 대기중'))