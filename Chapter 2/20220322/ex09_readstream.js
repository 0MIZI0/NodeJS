const fs = require('fs')

// read stream 
// flowing 모드일 때, 만약 이것을 수신할 수신자가 없으면 데이터는 사라지게 된다.
// flowing 모드일 경우에는 데이터가 연속적으로 흐르고 있어 이벤트로 처리해야 한다.
const rs = fs.createReadStream('./readme.txt', {highWaterMark: 8});  // chunk의 크기 8byte
const data = [];  // stream으로 넘어오는 데이터를 저장할 배열

// 청크(버퍼)들이 들어올 때마다 data 이벤트 발생, 스트림에 읽을 데이터가 없을 때까지 data 이벤트 발생
rs.on('data', (chunk)=>{
  data.push(chunk);  // data에 항목 추가
  console.log('chunk: ', chunk, chunk.length);
});

// 더 이상 읽어올 데이터가 없으면 end 이벤트 발생
rs.on('end', function(){
  console.log('end: ', Buffer.concat(data).toString('utf8'));
});

// 에러 처리
rs.on('error', (err)=>console.log(err))