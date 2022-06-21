var express = require('express');
var router = express.Router();
var model_post = require('../models/postsDAO');
const model_user = require('../models/usersDAO');
const {isLoggedIn}=require('./middlewares');

// res.locals 에 설정된 변수들은 모든 템플릿 엔진에서 공통으로 사용
router.use(async (req, res, next) => {
  res.locals.user = {id: req.session.userEmail, nick: req.session.nick, isLogin: req.session.isLogin}
  res.locals.followerCount = 0;
  res.locals.followingCount = 0;
  res.locals.followerIdList = [];

	result = await model_user.selectFollow(req.session.userEmail);
	console.log('result = ', result);
	for(element of result){
		console.log('element = ', element)
		if(element.follower_id === req.session.userEmail){
			res.locals.followerIdList.push(element.following_id);
			res.locals.followingCount++;
		}
		if(element.following_id === req.session.userEmail){
			res.locals.followerCount++;
		}
	}
  next();
});

router.get('/join', (req, res) => {
  res.render('join', { title: '회원가입 - NodeBird' });
});

router.get('/profile', isLoggedIn, async (req, res) => {
  let followingList = await model_user.selectFollowingList(req.session.userEmail) || 0;
	let followerList = await model_user.selectFollowerList(req.session.userEmail) || 0;
  res.render('profile', { title: '내 정보 - NodeBird', followingList, followerList });
});

router.get('/hashtag', async (req, res, next)=>{
	console.log('req.query = ', req.query)
	const twits = await model_post.selectPostsWithTag(req.query.hashtag);
	console.log('twits : ', twits);
  res.render('main', { title: 'NodeBird', twits });
})

router.get('/', async (req, res, next) => {
  const twits = await model_post.selectPosts();
  console.log('twits : ', twits);
  res.render('main', { title: 'NodeBird', twits });
});

module.exports = router;