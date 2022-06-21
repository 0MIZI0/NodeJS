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
        const hen = getHen();
        const egg = await getEgg(hen);
        const meal = await cook(egg);
        console.log(meal);
    } catch (error) {
        console.log(error)
    }
}

getFood();