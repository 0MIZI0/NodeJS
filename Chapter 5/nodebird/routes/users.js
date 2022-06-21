var express = require('express');
var router = express.Router();

const {isLoggedIn}=require('./middlewares');
var model = require('../models/usersDAO');

router.post('/:id/follow', isLoggedIn, async (req, res, next)=>{
  try {
    console.log('req.params.id : ', req.params.id);
    const user = await model.selectUser(req.params.id);
    console.log('user : ', user);
    if(user){
      await model.insertFollowing(req.session.userEmail, req.params.id)
      res.send('success');
    }else{
      res.status(404).send('no user');
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
})

module.exports = router;