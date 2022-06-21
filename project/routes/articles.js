const express = require('express');
const articlesModel = require('../functions/articlesModel');
const router = express.Router();

router.use(async (req, res, next) => {
    if( req.session.user ) {
      res.locals.userData = req.session.user;
    }
    else res.locals.userData = {
      isLogin: false,
      email: ""
    }
    next();
})

router.get('/', (req, res) => {
    articlesModel.getList((result) => {
        res.render('articles/listForm', { 'title': 'Articles', 'articles':result });
    });
});

router.get('/new', (req, res) => {
    res.render('articles/writeForm', { 'title' : 'New Article' });
});

// create
router.post('/', function(req, res){
    let data = {
        'title': req.body.title,
        'body': req.body.editordata,
        'email' : req.session.user.email
    };
    articlesModel.insertData(data, (result) => {
        if(result){
            if(result.affectedRows === 1) res.redirect('/articles');
            else return res.json(err);
        }
    })
});
  
// show
router.get('/:id', function(req, res){
    articlesModel.getArticle( req.params.id, (result) => {
        // console.log(result[0]);
        res.render('articles/viewForm', { 'title': 'View Page', 'article' : result[0]});
    })
});

// edit
router.get('/:id/edit', (req, res) => {
    articlesModel.getArticle( req.params.id, (result) => {
        res.render('articles/editForm', { 'title': 'Edit Page', 'article': result[0] });
    });
});

// update
router.put('/:id', function(req, res){
    articlesModel.updateArticle( req.body, req.params.id, (result) => {
        if(res){
        res.redirect('/articles/'+ req.params.id );
        }   
    });
});

// destroy
router.delete('/:id', function(req, res){
    articlesModel.deleteArticle( req.params.id, (result) => {
        if(res){
            res.redirect('/articles');
        }
    });
});

module.exports = router;