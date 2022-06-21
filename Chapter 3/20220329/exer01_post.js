const http = require('http');
const fs = require('fs/promises');
const baseURL = 'http://localhost:3000/'

const server = http.createServer(async (req, res)=>{
    if(req.method.toLowerCase() === 'post'){
      // <1> stream으로 넘어오는 데이터 chunk를 body 변수에 저장
      let body='';
      req.on('data', (chunk)=>{
          body += chunk;
      });

      req.on('end', ()=>{
        // <2> post로 넘어온 문자열을 URLSearchParams 객체로 파싱하여 저장
        const data = new URLSearchParams(body);   // num1=1&num2=100 => {'num1'=>1, 'num2'=>2}

        // <3> 변수 num1, num2에 URLSearchParams객체의 문자열값을 정수로 변환하여 저장
        let num1 = parseInt(data.get('num1'));
        let num2 = parseInt(data.get('num2'));

        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        if(Number.isNaN(num1) || Number.isNaN(num2)){
          res.statusCode = 400;  // 400 Bad Request
          res.end('잘못된 숫자가 입력되어 에러가 발생함.')
        }else{
            let sum = 0;
            for(let i=num1; i<=num2; i++)
                sum += i;
            res.end(`<h1>${num1} ~ ${num2}의 합계: ${sum}</h1>`);
        }
      })
    }else{
      // sum.html 파일을 읽어와 서비스
      const data = await fs.readFile('./sum.html')
      res.end(data);
    //   fs.readFile('./sum.html')
    //     .then(data)=>res.end(data);
    //     .catch(err)=>console.log(err);
    }
}).listen(3000, ()=>console.log('3000 포트에서 대기중'))