var express = require('express');
var router = express.Router();
var model = require('../models/usersDAO');

// 로그인 처리
router.post('/login', async (req, res)=>{
  if(req.body.email && req.body.pwd){
    console.log('req.body: ', req.body);
    let results = await model.selectUser(req.body.email);
    console.log('results: ', results);
    if(req.body.email === results[0].email && req.body.pwd === results[0].pwd){
      req.session.isLogin = true;               // 로그인 성공 req.session에 기록
      req.session.userEmail = req.body.email;   // 로그인에 성공한 사용자의 email을 req.session에 기록
      res.redirect('/');
    }else{
      res.send('<h1>로그인 실패</h1>')
    }
  }else{
    res.redirect('/');
  }
})

router.get('/logout', (req, res)=>{
  req.session.destroy(function(err){
    if(err)
        console.log(`req.session.destroy error : ${err}`);
    res.redirect('/');
  });
})

module.exports = router;