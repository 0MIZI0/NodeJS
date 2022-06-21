// const fs = require('fs');

// let rs = fs.createReadStream('./readme.txt', {highWaterMark: 8});
// const data = [];

// //
// rs.on('data',(chunk) => {
//     data.push(chunk);
//     console.log('chunk: ', chunk, chunk.length);
// });

// rs.on('end', () => {
//     console.log('end: ', Buffer.concat(data).toString('utf8'));
// });

// rs.on('error', (err)=> console.log(err));


// const fs = require('fs');

// let rs = fs.createReadStream('./readme.txt');
// let ws = fs.createWriteStream('./readme2.txt');

// rs.pipe(ws); // read 흐름과 write 흐름 사이의 파이프. rs 를 연결된 ws로 푸시?

// rs.on('error', err=>console.log(err));

//http
const http = require('http');
const fs = require('fs/promises');

// let server = http.createServer(async (req,res) => {
//     console.log('req.url', req.url);
//     if(req.url == '/'){
//         let data = await fs.readFile('./public/index.html');
//         res.end(data);
//     }else if(req.url === '/second'){
//         res.write('<h1>Second page</h1>')
//         res.end(`<h1><a href='/third'>third page</a></h1>`)
//       }else if(req.url === '/third'){
//         res.write('<h1>Third page</h1>')
//         res.end("<a href='/'>index.html</a>")
//     }
// }).listen(8080, ()=>console.log('waiting on port 8080'));

let server = http.createServer(async (req,res) => {
    console.log(req.url);
    console.log(req);
    if(req.url == "/") {
        let data = await fs.readFile("./public/index.html");
        res.end(data);
    }
}).listen(8080, () => console.log("server listening"))

// function addSync(a,b,callback){
//     setTimeout(()=>{callback(a,b)}, 1000);
// }

// addSync(1,2,(a,b) => console.log(a+b));

// let a = (k) => new Promise((resolve, reject) => {
//     if(k) resolve(k);
//     else reject(k);
// });

// a(0)
// .then(result => console.log(`성공 ${result}`))
// .catch(result => new Promise((res,rej) => {
//     setTimeout(() => {console.log("ㅎ");res(result);}, 10000);
// })).then(res => console.log(res));

// const urlString ="https://www.youtube.com/watch?v=nPyZmn7hkH4";

// let url = new URL(urlString);

// console.log(url);
// console.log(url.searchParams);
// console.log(url.searchParams.get('v'));
// console.log(url.searchParams.keys());

// setInterval(() => console.log("씨발1초가지났어"),1000);
// setTimeout(() => console.log("응 1.5초지났어"),1500);

// clearTimeout(); 

// const fs = require('fs/promises');

// fs.access('./readme.txt')
//   .catch(()=>{ console.log("Create txt file")
//     fs.writeFile('./readme.txt', 'Hello Node')})
//   .then(()=>fs.readFile('./readme.txt'))
//   .then((data)=>{
//       console.log(data.toString('utf8'));
//       var newData = data.toString().replace('Node', 'World');
//       return  fs.writeFile('./readme.txt', newData);
//   })
//   .then(()=>fs.readFile('./readme.txt'))
//   .then((data)=>console.log(data.toString()))

// fs.writeFile('./readme.txt', "gasaeki").then(()=>console.log("shibal"));