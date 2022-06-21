const http = require('http');
const fs = require('fs/promises')
const cookie = require('cookie');

http.createServer(async (req, res) => {
  const baseURL = 'http://localhost:3000'
  const parsedURL = new URL(req.url, baseURL)

  // 1. 쿠키 파싱
  const cookies = cookie.parse(req.headers.cookie || '');
  console.log('cookies:', cookies)

  // 2. 쿠키 존재에 여부에 따른 분기 처리
  // 2-1. 주소가 /login으로 시작하는 경우: 쿠키 생성
  if (req.url.startsWith('/login')) {
    const qs = parsedURL.searchParams
    res.writeHead(302, {
      Location: '/',
      'Set-Cookie': `name=${encodeURIComponent(qs.get('name'))}; Max-Age=${60*60*9+60*5}; HttpOnly; Path=/`,
    });
    res.end();
  // 2-2. name이라는 쿠키가 있는 경우: 쿠키의 값을 활용하여 화면 생성
  } else if (cookies.name) {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(`${cookies.name}님 안녕하세요`);
  // 2-3. cookie2.html 파일 제공
  } else {
    try {
      const data = await fs.readFile('./public/cookie2.html');
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(data);
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(err.message);
    }
  }
}).listen(3000, () => console.log('3000번 포트에서 서버 대기 중입니다!'));