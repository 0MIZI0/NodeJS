var express = require('express');
var router = express.Router();
const crypto = require('crypto');
var model = require('../models/usersDAO');

router.post('/join', async (req, res, next)=>{
  const {email, nick, password} = req.body;

  try {
    const exUser = await model.selectUser(email);
    if(exUser.length){
      console.log('이미 존재하는 email 에러')
      return res.redirect('/join?error=exist')
    }
    // 비밀번호 암호화
    const hash = crypto.createHmac('sha256', password)
                   .update('I love cupcakes')
                   .digest('hex');
    // 사용자 정보를 데이터베이스에 추가
    await model.insertUser([email, nick, hash]);
    return res.redirect('/');
  } catch (error) {
    console.error(error);
    return next(error);
  }
})

// 로그인 처리
router.post('/login', async (req, res, next)=>{
    const {email, password} = req.body;
    const exUser = await model.selectUser(email);
    if(exUser.length){
        const hash = crypto.createHmac('sha256', password)
                        .update('I love cupcakes')
                        .digest('hex');
        if(email === exUser[0].email && hash === exUser[0].password){
        console.log('로그인 성공')
        // 로그인 성공 req.session에 기록
        req.session.isLogin = true;
        req.session.userEmail = email;
        req.session.nick = exUser[0].nick;
        return res.redirect('/')
        }
    }else{
        console.log('존재하지 않는 email 에러')
        return res.redirect('/')
    }
    })
    // 로그아웃 처리
    router.get('/logout', (req, res)=>{
    req.session.destroy();
    res.redirect('/');
})

module.exports = router;