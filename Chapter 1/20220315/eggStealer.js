// 1. Producer
const getHen = () => 
    new Promise((resolve, reject)=>{
        setTimeout(() => resolve('암닭 획득'), 1000);
        // setTimeout(() => reject(new Error(`암닭 획득 실패`)), 1000);
    })

const getEgg = (hen) => 
    new Promise((resolve, reject)=>{
        setTimeout(() => resolve(`${hen} -> 계란 획득`), 1000);
        // setTimeout(() => reject(new Error(`${hen} -> 계란 획득 실패`)), 1000);
    })

const cook = (egg) => 
    new Promise((resolve, reject)=>{
        setTimeout(() => resolve(`${egg} -> 계란 후라이 요리`), 1000);
        // setTimeout(() => reject(new Error(`${egg} -> 요리 실패`)), 1000);
    })

// 2. Consumer: then, catch finally
getHen()
  .then(hen => getEgg(hen))
  .then(egg => cook(egg))
  .then(meal => console.log(meal))
  .catch(err => console.log(err))

console.log('다른 코드 실행')
// // 3. 축약 표현(Promise Consumer 축약 표현)
// getHen()
//   .then(getEgg)
//   .then(cook)
//   .then(console.log)
//   .catch(console.log)