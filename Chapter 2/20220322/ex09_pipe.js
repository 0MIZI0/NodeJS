const fs = require('fs')

// pipe()를 이용한 복제
// Readable.pipe() 메서드는 readable 스트림을 연결된 writeable 스트림으로 푸시한다.
// readStream과 writeStream을 연결하여 파일이 복사되는 결과를 낳는다.
const rs = fs.createReadStream('./readme.txt');
const ws = fs.createWriteStream('./readme2.txt');

// 읽을 수있는 모든 데이터는 ws로 이동한다.
rs.pipe(ws);

// 새로운 기능(내부적으로 스트림으로 처리)
// fs.copyFile('./readme.txt', './readme2.txt', (err)=>console.log(err))

rs.on('error', (err)=>console.log(err))