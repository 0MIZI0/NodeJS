var express = require('express');
const path = require('path');
const fs = require('fs')
const multer = require('multer');

var model = require('../models/postsDAO');
const {isLoggedIn}=require('./middlewares');

var router = express.Router();

try {
  fs.readdirSync('public/uploads');
} catch (error) {
  console.error('public/uploads 폴더가 없어서 uploads 폴더를 생성합니다.');
  fs.mkdirSync('public/uploads');
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb){
      cb(null, 'public/uploads/');
    },
    filename(req, file, cb){                                                // originalname = 사용자가 업로드한 파일 명	
      const ext = path.extname(file.originalname);                          // hello.jpg => .jpg
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);   // hello1653283190504.jpg
    },  
  }),
  limits: {fileSize: 5 * 1024 * 1024}, // 파일 크기 5mb 이하
});

// 이미지 하나를 업로드받은 뒤, 이미지의 저장 경로를 클라이언트로 응답
// public/uploads 폴더에 이미지 파일 저장
router.post('/img', isLoggedIn, upload.single('img'), (req, res)=>{
  console.log('req.file : ', req.file);
  res.json({url: `uploads/${req.file.filename}`});
});

const upload2 = multer();

// 게시글 업로드 처리
router.post('/', isLoggedIn, upload2.none(), async (req, res, next)=>{
  // 1. posts 테이블에 데이터 삽입
  try {
    await model.insertPost([req.body.content, req.body.url, req.session.userEmail]);
  } catch (error) {
    console.log('post/ 경로에서 에러 발생', error);
  }

  // 2. hashtag 테이블에 데이터 삽입
  // # = #으로 시작, [^문자] = 제외문자, \s = 공백문자, + = 하나 이상의 문자, g = 대상 문자열내에 모든 패턴들을 검색
  const contentRegExp = new RegExp(/#[^\s#]+/g);  
  // 해시태그가 존재하면 그 숫자만큼 반복 실행
  while((regexp = contentRegExp.exec(req.body.content)) != null){
    hashtag = regexp[0].slice(1).toLowerCase();     // 해시태그에서 '#'을 제거하고 소문자로 변환하여 저장
    
    // 동일한 해시태그가 존재하면 제외시키기
    result = await model.selectHashtag(hashtag);
    if(result.length){
      console.log(`${hashtag}는 이미 존재함.`);
    }else{
      await model.insertHashtag(hashtag);           // 새로운 해시태그이면 hashtag 테이블에 추가
    }
    let post_id = await model.selectLastPostId();   // 최근 업로드된 게시물의 id
    post_id = post_id[0].id;
    console.log('post_id : ', post_id);
    await model.insertPosts_has_Hashtag(post_id, hashtag);    // 게시물 id와 hashtag를 posts_has_hashtag 테이블에 추가
  }

  res.redirect('/');
});

module.exports = router;