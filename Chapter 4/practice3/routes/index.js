var express = require('express');
var router = express.Router();


let userList = [{uid: 'uname1', psw: '1234'}, {uid: 'uname2', psw: '1234'}];
/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('req.cookies: ', req.cookies);
  res.render('index', { title: 'Express', uname: req.session.uname, isLogin: req.session.isLogin });
});

router.get('/logout', function(req, res, next){
  delete req.session.isLogin;
  return req.session.save(() => {
    return res.redirect('/');
  })
})

router.post('/login', function(req, res, next){
  if( checkAuth(req.body.uname, req.body.psw) ){
    console.log(req.body.uname, req.body.psw);
    req.session.uname = req.body.uname;
    req.session.isLogin = true;
  }
  res.redirect('/');
})

function checkAuth(uname, psw){
  for( let user of userList) if ( uname === user.uid && psw === user.psw ) return true;
  return false;
}
module.exports = router;
