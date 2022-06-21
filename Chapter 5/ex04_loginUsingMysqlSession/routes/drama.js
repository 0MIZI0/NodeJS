var express = require('express');
var router = express.Router();
var model = require('../models/dramaDAO');

router.get('/', async function(req, res, next) {
  let results = await model.selectDrama();
  res.render('dramaList', { title: 'My Favorite Drama List', list: results, isLogin: req.session.isLogin });
});

router.post('/', async (req, res, next)=>{
  if(req.body.title && req.body.actor){
    await model.insertData(req.body.title, req.body.actor);
  }
  res.redirect('/drama');
})

router.post('/update/:id', async function(req, res){
  //res.send(`/update req.params.id: ${req.params.id}`);
  if(req.body.title && req.body.actor){
    await model.updateDrama(req.params.id, req.body);
  }
    res.redirect('/drama');
})

router.get('/delete/:id', async function(req, res){
  //res.send(`/delete req.params.id: ${req.params.id}`);
  await model.deleteDrama(req.params.id);
  res.redirect('/drama')
})

module.exports = router;
//asdasdasd