// 콜백 함수를 사용한 비동기 처리 => 콜백지옥 예시
var fs = require('fs');

fs.access('./readme.txt', function(err){  // 파일 존재 여부 체크
    if(err){
        console.log(err.message);
        fs.writeFile('./readme.txt', 'Hello Node', function(err){
          console.log(err.message);
        })
    }else{
        fs.readFile('./readme.txt', function(err, data){  
            if(err){
                console.log(err.message);
            }else{
                console.log(data.toString('utf8'));
                var newData = data.toString().replace('Node', 'World');  // 일부 텍스트 수정
                fs.writeFile('./readme.txt', newData, function(err){  // 수정된 내용으로 파일 작성
                    if(err){
                        console.log(err.message);
                    }else{
                        fs.readFile('./readme.txt', function(err, data){
                            if(err){
                                console.log(err.message)
                            }else{
                                console.log(data.toString());
                            }
                        })
                    }
                })
            }
        })
    }
})