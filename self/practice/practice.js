// function add(a,b) {
//     return a+b;
// }


// console.log("start");
// console.log(add(1,2));
// console.log("end");

// function addSync(a, b, callback){
//     setTimeout(() => {
//         callback(a+b)
//     }, 1000);
// }

// console.log('before');
// addSync(1, 2, function(result){
//     console.log(result);
// })
// console.log("after");

// const fs = require('fs/promises');

// ( async() => {
    
//     try{
//         await fs.access('./readme.txt');
//     }catch(err){
//         console.log("Created Text File");
//         await fs.writeFile("./readme.txt","Hello Node");
//     }

//     let data = await fs.readFile('./readme.txt');
//     console.log(data.toString('utf8'));

//     let newData = data.toString('utf8').replace("Node", "World");
//     await fs.writeFile('./readme.txt', newData);

//     data = await fs.readFile("./readme.txt");
//     console.log(data.toString('utf8'));

// })();

// let fs = require('fs/promises');

// fs.readFile('./readme.txt')
//     .then((data) => {
//         console.log(data);
//         console.log(data.toString('utf8'));
//     })
//     .catch( err => {
//         console.log(err);
//     });

// fs.writeFile('./readme.txt', "Hello Node")
//     .then(() => fs.readFile('./readme.txt'))
//     .then(data => console.log(data.toString('utf8')))
//     .catch(err => console.log(err));

const getHen = () => new Promise((resolve, reject) => {
    setTimeout( () => resolve('암탉 획득'), 1000);
}) 

const getEgg = (hen) => new Promise((resolve, reject) => {
    setTimeout(() => resolve(`${hen} -> 계란 획득 실패`), 1000);
})

const cook = (egg) => new Promise((resolve, reject) => {
    setTimeout(() => resolve(`${egg} -> 계란 후라이 요리`), 1000);
})

getFood = async() => {
    const hen = await getHen();
    const egg = await getEgg(hen);
    const meal = await cook(egg);
    console.log(meal);
}


function addAsync(a, b, callback){
    setTimeout(() => {
      callback(a+b)
    }, 1000)
}

// console.log('before')
// addAsync(1, 2, function(result){
//     console.log(result)
// })
// console.log('after')

const add = (a,b) => new Promise((res) => {
    setTimeout(() => res(a+b),1000);
});

console.log('before')
add(1,2).then(result => console.log(result));
console.log('after');

// ( async () => {
//     const hen = await getHen();
//     const egg = await getEgg(hen);
//     const meal = await cook(egg);
//     console.log(meal);
// })();

// getFood();
// getHen().then(hen => console.log(hen));

// const a = (b,c,callback) => {
//     console.log(b);
//     setTimeout(()=>{
//         console.log(c);
//         callback();
//     }, 1000);
// }
// a(1,10,()=>console.log(100));


// function sleep (time) {
//     return new Promise((r) => setTimeout(r, time));
// }

// ( async () => {
//     console.log(1);
//     await sleep(1000).then(() => console.log(10));
//     console.log(100);
// })();

exports.checkOddEven = function(num){
    if( num % 2) return 'odd';
    else return 'even';
}

module.exports = {
    getFood
};