const http = require('http');

// 드라마 리스트
let dramaList = [
    {title: '이태원 클라쓰', actor: '박서준, 김다미'},
    {title: '스토브리그', actor: '남궁민, 박은빈'}
]

const baseURL = 'http://localhost:3000/'

// 클라이언트에게 화면을 제공하는 함수
function showDramaList(res, method){
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    res.write('<html><body><h1>My Favorite Drama</h1><ul>');
    for(let i=0; i<dramaList.length; i++)
      res.write(`<li>${dramaList[i].title}(${dramaList[i].actor})</li>`); 
    res.end(`</ul>
    ---------------------------------------------------
    <h2>Add Drama</h2>
    <form method=${method} action="/">
        <label for="title">제목 : </label><input type="text" id="title" name="title"><br>
        <label for="actor">배우 : </label><input type="text" id="actor" name="actor"><br>
        <input type="submit">
    </form></body></html>`)
  }

  const server = http.createServer(function(req, res){
    if(req.url === '/favicon.ico') return;        // 파비콘 요청 무시
    console.log('req.url : ', req.url);
    
    if(req.method.toLowerCase() === 'post'){
      addDramaItem(req, res);
    }else{
      showDramaList(res, 'post');
    }
  }).listen(3000, function(){
    console.log('3000 포트에서 대기중');
  });
  
  function addDramaItem(req, res){
    // post로 넘어오는 데이터는 'data'와 'end' 이벤트로 받는다.
    let body = '';
  
    req.on('data', function(chunk){
        body += chunk;
        console.log('body : ', body) // title=조승우&actor=비밀의 숲
    });
  
    req.on('end', function(){
        const sp = new URLSearchParams(body);   // title=조승우&actor=비밀의 숲
        console.log('SearchParams: ', sp)     // { title: '조승우', actor: '비밀의 숲' }
        if(sp.get('title') && sp.get('actor'))
            dramaList.push({title: sp.get('title'), actor: sp.get('actor')});
        res.writeHead(302, {'Location': '/'});
        res.end();
    });
  }