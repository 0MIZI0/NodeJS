const express = require('express');
const router = express.Router();

// 라우터 레벨 미들웨어는 express.Router() 인스턴스에 바인드된다는 점을 제외하면 
// 애플리케이션 레벨 미들웨어와 동일한 방식으로 작동한다.
// router.use() 및 router.METHOD() 함수를 사용하여 라우터 레벨 미들웨어를 로드
router.use(function timeLog(req, res, next) { // middleware
  console.log('Time: ', Date.now());
  next();
});

router.use(function(req, res, next){
  console.log('birds middleware1');
  next()
})

router.use(function(req, res, next){
  console.log('birds middleware2');
  next()
})

router.get('/', function(req, res) {
  res.send('<h1>Birds home page</h1>');
});

router.get('/about', function(req, res) {
  res.send('<h1>About birds</h1>');
});

module.exports = router;