// const express = require('express');
// const path = require('path');
// const logger = require('morgan');
// const cookieParser = require('cookie-parser')

// const app = express();                
// const port = 3000

// app.use(logger('dev'));
// app.use(express.static('public', {index:false}))
// app.use(express.json())
// app.use(express.urlencoded({extended:false}))
// app.use(cookieParser())

// app.get('/', (req, res)=>{
//   console.log('req.cookies', req.cookies)
//   if(req.cookies.name){
//     res.send(`<h1>${req.cookies.name}님 안녕하세요</h1>`)
//   }else{
//     res.redirect('/cookie2.html')
//   }
// });

// app.get('/login', (req, res)=>{
//   res.cookie('name', req.query.name, { maxAge: 60*60*9+60*5, httpOnly: true }) // 허락하는건 .. html 뿐이니까 ..
//   res.redirect('/')
// })

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`)
// })

const express = require('express');
const path = require('path');
const app = express();                
const port = 3000
const logger = require('morgan');

app.use(logger('dev'));
app.use(express.static('public', {index: false}));

// get 요청 처리(num1 ~ num2까지의 합계)
app.get('/', function(req, res){
    console.log('req.query', req.query)
    if(req.query.num1 && req.query.num2){
        let num1 = parseInt(req.query.num1);
        let num2 = parseInt(req.query.num2);
        console.log(`num1=${num1}, num2=${num2}`);
        res.send(`
            <h1>GET 요청 처리 결과: ${calculateSum(num1, num2)}</h1>
            <h1><a href="/">Home</a></h1>
        `);
    }else{
        console.log('/sumRequest.html 리다이렉트 요청')
        res.redirect('/sumRequest.html')
    }
});

// post 요청 처리(num1 ~ num2까지의 합계)
app.use(express.urlencoded({ extended: true }));

app.post('/', function(req, res){
    console.log('req.body: ', req.body)
    if(req.body.num1 && req.body.num2){
        var num1 = parseInt(req.body.num1);
        var num2 = parseInt(req.body.num2);
        console.log(`num1=${num1}, num2=${num2}`);
        res.send(`
            <h1>POST 요청 처리 결과: ${calculateSum(num1, num2)}</h1>
            <h1><a href="/">Home</a></h1>
        `);
    }else{
        console.log('/sumRequest.html 리다이렉트 요청')
        res.redirect('/sumRequest.html')
    }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

function calculateSum(num1, num2){
    var sum = 0;
    for(var i=num1; i<=num2; i++){
        sum += i;
    }
    return sum;
}