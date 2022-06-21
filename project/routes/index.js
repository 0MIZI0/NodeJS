var express = require('express');
var router = express.Router();

router.use(async (req, res, next) => {
  if( req.session.user ) {
    res.locals.userData = req.session.user;
    console.log(res.locals.userData);
  }
  else res.locals.userData = {
    isLogin: false
  }
  next();
})

router.get('/', function(req, res, next) {
  res.render('pages/index', { title: 'Sample Blog'});
});

router.get('/about',(req, res, next)=>{
  res.render('pages/about', { title: 'About'});
})

module.exports = router;
