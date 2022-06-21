var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/get', (req, res, next)=>{
  res.send(JSON.stringify({
    requestMethod: 'get',
    responseData: 'Hi Client!'
  }))
})

router.post('/post', (req, res, next)=>{
  console.log('req.body', req.body);
  // res.json(req.body);
  res.send(JSON.stringify({
    requestMethod: 'post',
    responseData: 'Hello Client!!!'
  }))
})

router.get('/datetime', (req, res, next)=>{
  res.render('datetime');
})

router.get('/get_datetime', (req, res, next)=>{
  let ts = Date.now();
  let date_ob = new Date(ts);
  let year = date_ob.getFullYear();
  let month = date_ob.getMonth() + 1;
  let date = date_ob.getDate();
  let hours = date_ob.getHours();
  let minutes = date_ob.getMinutes();
  let seconds = date_ob.getSeconds();
  
  res.json({year, month, date, hours, minutes, seconds});
})

module.exports = router;