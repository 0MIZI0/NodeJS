var fs = require('fs');

//#region 파일 읽기
// 1. 동기식 파일 읽기
console.log('start')
try {
  var data = fs.readFileSync('./readme.txt', 'utf8')
  console.log('1', data);
} catch (error) {
  console.log('fs.readFileSync() 에러 발생')
}
console.log('end')

// 2. 비동기식 파일 읽기 -> 비동기 : callback!
console.log('start')
fs.readFile('./readme.txt', function(err, data){
  if(err){
    console.log('fs.readFile() 에러 발생');
  }else{
    console.log('2', data)
    console.log(data.toString('utf-8'));
  }
})
console.log('end')
//#endregion

//#region 파일 쓰기/추가
// 3. 파일 쓰기
fs.writeFile('./readme.txt', '안녕하세요.', function(err){
  if(err) throw err;
  fs.readFile('./readme.txt', 'utf8', function(err, data){
    console.log('3', data);
  });
});

// 4. 파일에 내용 추가하기
fs.appendFile('./readme.txt', '반갑습니다.', ()=>console.log('4 내용 추가 완료'));
//#endregion

//#region 존재 확인, 디렉토리 생성/읽기
// 5. 파일 존재 여부 확인
fs.access('./readme.txt', (err)=>{
	if(err){
		console.log('존재하지 않는 파일입니다.')
		return;
	}
  fs.readFile('./readme.txt', 'utf-8', (err, data)=>{
		console.log('5', data);
	});
});

// 6. 디렉토리 생성하기
fs.mkdir('./testDir', function(err){
  if(err) throw err;
  console.log('6 디렉토리 생성 성공');
});

// 7. 디렉토리 읽기
fs.readdir('./', (err, files)=>{
	if(err) throw err;
  console.log('7', files);
});
//#endregion