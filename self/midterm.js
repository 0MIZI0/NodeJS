//비동기 처리

// 1. 동기식 add() 함수
function addSync(a, b){
    return a+b;
  }
  
  console.log('before')
  console.log(addSync(1,2))
  console.log('after')
  
  
  // 2. 비동기식 add() 함수
  function addAsync(a, b, callback){
    setTimeout(() => { //시험에 나올 것이다...  비동기 구현하는 식으로!
      callback(a+b)
    }, 1000) //setTimeout(함수,기다릴 시간)
  }
  
  console.log('before')
  addAsync(1, 2, function(result){
    console.log(result)
  })
  console.log('after')

// -----*-----*-----*-----*-----*-----*-----*-----*-----*-----*-----*-----*-----*-----*-----*-----*-----*-----*-----*-----
//프로미스 -> callback hell 의 해결방법
//fs 의 promise api 활용 방법이 나옴
//chapter 2 의 fs



// -----*-----*-----*-----*-----*-----*-----*-----*-----*-----*-----*-----*-----*-----*-----*-----*-----*-----*-----*-----
// async/await
// try/catch 부분 무시(오류처리 안나옴)
// 비동기를 순차처럼 -> async() 로 표시
// promise 를 async 로 바꾸는 문제 나온대

// 1. Producer
const getHen = () => 
    new Promise((resolve, reject)=>{
        setTimeout(() => resolve('암닭 획득'), 1000);
    })

const getEgg = (hen) => 
    new Promise((resolve, reject)=>{
        setTimeout(() => resolve(`${hen} -> 계란 획득`), 1000);
    })

const cook = (egg) => 
    new Promise((resolve, reject)=>{
        setTimeout(() => resolve(`${egg} -> 계란 후라이 요리`), 1000);
    })

// 2. consumer: await은 async으로 선언된 함수 안에서 사용해야 한다.
getFood = async()=>{
    try {
        const hen = await getHen();
        const egg = await getEgg(hen);
        const meal = await cook(egg);
        console.log(meal);
    } catch (error) {
        console.log(error)
    }
}

getFood();

// -----*-----*-----*-----*-----*-----*-----*-----*-----*-----*-----*-----*-----*-----*-----*-----*-----*-----*-----*-----
// -----*-----*-----*-----*-----*-----*-----*-----*-----*-----*-----*-----*-----*-----*-----*-----*-----*-----*-----*-----
//chapter2

//사용자 정의 함수
//{} -> 자바스크립트 객체, key:value 구조
//key value 같으면 생략 가능

/* //var.js
const odd = '홀수입니다';
const even = '짝수입니다';

module.exports = {
  odd,
  even,
};
*/
/* //func.js
const { odd, even } = require('./var');

exports.checkOddOrEven = function(num){
  if (num % 2) { // 홀수면
    return odd;
  }
  return even;
}*/

const { odd, even } = require('./var');
const { checkOddOrEven:checkNumber } = require('./func'); //이름을 바꿔서

function checkStringOddOrEven(str) {
  if (str.length % 2) { // 홀수면
    return odd;
  }
  return even;
}

console.log(checkNumber(10));
console.log(checkStringOddOrEven('hello'));

// -----*-----*-----*-----*-----*-----*-----*-----*-----*-----*-----*-----*-----*-----*-----*-----*-----*-----*-----*-----

const urlString = 'https://user:pass@sub.example.com:8080/p/a/t/h?query=string1&query=string2&query2=string3#hash'

//#region 1. WHATWG 방식(full url만 처리 가능)
// // 객체로 파싱된 url
var myURL = new URL(urlString);
console.log('new API', myURL);  

// searchParams를 추출하는 기능
console.log(myURL.searchParams);
console.log(myURL.searchParams.get('query'));
console.log(myURL.searchParams.has('query'));
console.log(myURL.searchParams.getAll('query'));
console.log(myURL.searchParams.keys());
console.log(myURL.searchParams.values());
console.log('-----------------------------------------------------------------------------')
//#endregion

// -----*-----*-----*-----*-----*-----*-----*-----*-----*-----*-----*-----*-----*-----*-----*-----*-----*-----*-----*-----
//파일시스템
var fs = require('fs/promises');

// 파일 읽기
fs.readFile('./readme.txt')
  .then((data) => {
    console.log(data);
    console.log(data.toString());
  })
  .catch((err) => {
    console.error(err);
  });

// 파일 쓰기
fs.writeFile('./readme.txt', '안녕하세요~')
  .then(() => fs.readFile('./readme.txt'))
  .then(data => console.log(data.toString()))
  .catch(err => console.error(err))

// -----*-----*-----*-----*-----*-----*-----*-----*-----*-----*-----*-----*-----*-----*-----*-----*-----*-----*-----*-----
