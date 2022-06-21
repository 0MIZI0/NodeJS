const fs = require('fs');

// 1-1. 텍스트 파일에 쓰기
const ws = fs.createWriteStream('./readme.txt');  //데이터를 file에 기록할 수 있는 writeStream
ws.write('스트림은 Node.js에서\n');
ws.write('스트리밍 데이터로 작업하기 위한\n');
ws.write('추상 인터페이스\n');

// 'finish'이벤트는 stream.end() 메서드가 호출되고, 모든 데이터가 flush 된 후에 발생
ws.on('finish', function(){
  console.log('파일 스트림 finish 이벤트 발생');
});

// 1-2. 터미널에서 입력받은 텍스트를 파일에 쓰기
// 표준 입력 스트림에 읽을 수 있는 데이터가있을 때 'readable'이벤트가 발생한다.
process.stdin.on('readable', function(){
  console.log('읽을 수 있는 데이터가 있음.');

  let data;

  while((data = this.read()) !== null){  // this === process.stdin
    ws.write(data);

    // 'exit'라는 string 이 입력되면 빠져나간다.
    if(data.toString() === 'exit\r\n'){
      console.log('입력 상태 종료')
      ws.end('end()함수 실행')  // 하나의 최종 데이터 청크를 쓰고 스트림을 닫기는다.
      break;
    }  
  }
});