var express = require('express');
var router = express.Router();


const dramaList = [
  { title: "오징어 게임", actor: "이정재"},
  {title: "나의 아재", actor: "유아이"}
];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '드라마 추천', dramaList: dramaList });
});

router.post('/', function(req,res,next){
  console.log(req.body);
  if(req.body.title && req.body.actor){
    dramaList.push( {title: req.body.title, actor:req.body.actor});
  }
  res.redirect('/');
});

module.exports = router;
