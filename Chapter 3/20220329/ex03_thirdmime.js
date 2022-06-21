const http = require('http')
const fs = require('fs/promises');
const { createReadStream } = require('fs')
const path = require('path')
const mime = require('mime');

const server = http.createServer(function(req, res){
  console.log('req.url : ', req.url);

  // 1. favicon 요청과 루트 요청 처리
  if(req.url === '/favicon.ico'){
    res.setHeader('Content-Type', 'image/x-icon');
    createReadStream('./public/favicon.png').pipe(res)
    return
  }
  if(req.url === '/'){
    req.url = '/index.html';
  }

  // 2. req.url의 확장자에 맞는 mime 타입을 mime 모듈로 찾아서 저장 
  let filePath = path.join(__dirname, 'public', req.url);
  let mimeType = mime.getType(req.url);  
  console.log('mimeType: ', mimeType);

  // 4. 해당 파일을 읽어서 서비스
  if(mimeType == null) {
    res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
    res.end(`<h1>No mime type found : </h1><p>${req.url.substring(1)}</p>`);
  }else{
    try {
      res.writeHead(200, {'Content-Type': mimeType});
      createReadStream(filePath).pipe(res);
    } catch (error) {
      res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'});
      res.end(`<h1>file open 에러 발생</h1><p>${error.message}</p>`);
    }
  }
}).listen(3000, ()=>console.log('3000 포트에서 대기중'));