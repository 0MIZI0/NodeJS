const http = require('http')
const fs = require('fs/promises');
const { createReadStream } = require('fs')
const path = require('path')
const myMIME = require('./myMIME');  // 사용자 정의 MIME 변환 모듈

const server = http.createServer(async function(req, res){
  console.log('req.url : ', req.url);

  // 1. favicon 요청과 루트 요청 처리
  if(req.url === '/favicon.ico'){
    res.setHeader('Content-Type', 'image/x-icon');
    const data = await fs.readFile('./public/favicon.png')
    res.end(data)
    return;
  }
  if(req.url === '/'){
    req.url = '/index.html';
  }

  // 2. req.url에서 요청하는 파일의 확장자 추출하여 저장
  const filePath = path.join(__dirname, 'public', req.url); // 파일의 경로 string 생성
  const extension = path.extname(filePath).substring(1);    // 확장자 추출 '.png' → 'png'
  console.log('filePath: ', filePath);
  console.log('extension: ', extension);
  
  // 3. 확장자에 맞는 mime 타입을 'myMIME.js' 파일에서 찾아서 저장 
  const mimeType = myMIME[extension];  // 전송하는 파일에 맞는 MIME Type 저장
  console.log('myMIME: ', myMIME[extension]);

  // 4. 해당 파일을 읽어서 서비스
  try {
    const data = await fs.readFile(filePath)
    res.writeHead(200, {'Content-Type': mimeType});
    res.end(data);
  } catch (error) {
    res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
    res.end(`<h1>file open 에러 발생</h1><p>${error.message}</p>`);
  }

  // // 4. 해당 파일을 stream 방식으로 서비스
  try {
    res.writeHead(200, {'Content-Type': mimeType});
    createReadStream(filePath).pipe(res);
  } catch (error) {
    res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
    res.end(`<h1>file open 에러 발생</h1><p>${error.message}</p>`);
  }
}).listen(3000, ()=>console.log('3000 포트에서 대기중'));