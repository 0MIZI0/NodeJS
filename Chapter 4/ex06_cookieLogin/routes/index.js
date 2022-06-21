var express = require('express');
var router = express.Router();


let userList = [{uid: 'uname1', psw: '1234'}, {uid: 'uname2', psw: '1234'}];
/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('req.cookies: ', req.cookies);
  res.render('index', { title: 'Express', uname: req.cookies.uname, isLogin: req.cookies.isLogin });
});

router.get('/logout', function(req, res, next){
  res.clearCookie('isLogin');
  res.redirect('/');
})

router.post('/login', function(req, res, next){
  if( checkAuth(req.body.uname, req.body.psw) ){
    res.cookie('uname', req.body.uname, { httpOnly: true});
    res.cookie('isLogin', true, { expires: new Date(Date.now() + 10000), httpOnly: true});
  }
  res.redirect('/');
})

function checkAuth(uname, psw){
  for( let user of userList) if ( uname === user.uid && psw === user.psw ) return true;
  return false;
}
module.exports = router;
