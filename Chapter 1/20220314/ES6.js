// 2. 비동기식 add() 함수
  function addAsync(a, b, callback){
    setTimeout(() => {
      callback(a+b)
    }, 1000)
  }
  
  console.log('before')
  addAsync(1, 2, function(result){
    console.log(result)
  })
  console.log('after')