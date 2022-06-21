const { resolve } = require("path")

//1. Producer
const promise = (num, time) => new Promise(resolve, reject) => {
    setTimeout(() => resolve(`비동기${num} 작업 성공 : ${new Date().`))
}