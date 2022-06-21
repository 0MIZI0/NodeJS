const express = require('express');
const crypto = require('crypto');
const userModel = require('../functions/usersModel');
const router = express.Router();

// mysql 연결
const mysqlConnObj = require('../functions/mysql');
const mysqlConn = mysqlConnObj.init();
mysqlConnObj.open(mysqlConn); // 정상적으로 연결되었는지 확인

/* GET users listing. */
router.get('/', (req, res, next) => {
  if(!req.session.name){
    res.redirect('/')
  }
})

router.get('/signup', (req, res, next) => {
  res.render('pages/signup');
})

router.get('/login', (req, res, next) => {
  res.render('pages/login')
})

/*
post로 넘어온 값은 req.body 로 받을 수 있다.
get 으로 넘어온 값은 req.query 로 받을 수 있다.
*/
router.post('/signup', (req, res) => {
  const data = {
    "email": req.body.email,
    "name": req.body.first_name + req.body.last_name,
    "password" : req.body.password
  }
  console.log(data);

  userModel.insertUser(data, (results) => {
    if(results === "ERR_ALREADY_EXISTS"){
      res.write("<script>alert('Already Exists!')</script>");
      res.end("<script>window.location=\"/users/signup\"</script>");
    } else {
      res.write("<script>alert('Registered')</script>");
      res.end("<script>window.location=\"/\"</script>");
    }
  })
})

// 로그인 처리
router.post('/login', (req, res)=>{
  if(req.body.email && req.body.pwd){
    userModel.selectUser(req.body.email, (result) => {
      let pwd_crypt = crypto.createHmac('sha256', req.body.pwd).update(process.env.SECRET_SHA).digest('hex');
      if(req.body.email === result[0].userid && pwd_crypt === result[0].password){
        req.session.user = {
          "isLogin" : true,
          "email" : req.body.email,
          "nickname" : result[0].name
        }
        // console.log(req.session.user);
        if(req.body.remember && req.body.remember === 'remember-me') req.session.cookie.maxAge = 2628000000;
        res.write("<script>alert('login success')</script>");
        res.end("<script>window.location=\"/\"</script>");
      }else{
        res.write("<script>alert('Login process failed. Please check your id and pw is correct.')</script>");
        res.end("<script>window.location=\"/users/login\"</script>");
      }
    })
  }else{
    res.redirect('/');
  }
})

router.get('/logout', (req, res)=>{
  req.session.destroy(function(err){
    if(err)
        console.log(`req.session.destroy error : ${err}`);
    res.write("<script>alert('Logout success')</script>");
    res.end("<script>window.location=\"/\"</script>");
  });
})

module.exports = router;