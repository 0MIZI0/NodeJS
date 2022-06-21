// const { checkOddOrEven:checkNumber } = require('./func')

// console.log(checkNumber(2));

//타이머

// const timeout = setTimeout(() => {
//     console.log("1.5초 후 실행")
// }, 1500);

// const interval = setInterval( () => {
//     console.log("1초마다 실행")
// }, 1000);

// const immediate = setImmediate( () => {
//     console.log("즉시 실행");
// });

//URL _ WHATWG

// // const urlString = '/path?query=string1&query=string2&query2=string3#hash';
const urlString = "http://edu.gsa.hs.kr/~everytime/everytime/viewcontent.php?cnum=116&query=oh&query=jung&query2=hyeon";
// const baseURL = ""

var myURL = new URL(urlString);
// console.log("new API",myURL);

console.log(myURL.searchParams);
console.log(myURL.searchParams.get('cnum'));
console.log(myURL.searchParams.has('cnum'));
console.log(myURL.searchParams.getAll('query'));
console.log(myURL.searchParams.keys());
console.log(myURL.searchParams.values());

