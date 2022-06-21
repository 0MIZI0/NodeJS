var connection = require('./db')

exports.insertPost = (values)=>new Promise((resolve, reject)=>{
  const query = 'INSERT INTO posts (content, img, users_email) VALUES (?, ?, ?)'
  connection.query(query, values, function(error,results,fiedls){
    if(error)
      reject(error);
    else 
      resolve();
  })
})

exports.selectHashtag = (tag)=>new Promise((resolve, reject)=>{
  connection.query('SELECT * FROM hashtag WHERE title = ?', [tag], (error, results, fiedls)=>{
    if(error)
      reject(error);
    else
      resolve(results);
  })
})

exports.insertHashtag = (hashtag)=>new Promise((resolve, reject)=>{
  const query = 'INSERT INTO hashtag (title) VALUES (?)'
  connection.query(query, [hashtag], (error,results,fiedls)=>{
    if(error)
      reject(error);
    else 
      resolve();
  })
})

exports.selectLastPostId = ()=>new Promise((resolve, reject)=>{
  connection.query('SELECT id FROM posts ORDER BY id DESC LIMIT 0, 1', (error, results, fiedls)=>{
    if(error)
      reject(error);
    else
      resolve(results);
  })
})

exports.selectPosts = ()=>new Promise((resolve, reject)=>{
  const qeury = 'SELECT * FROM posts ORDER BY create_at DESC';
  connection.query(qeury, (error, results, fiedls)=>{
    if(error)
      reject(error);
    else
      resolve(results);
  })
})

exports.selectPostsWithTag = (hashtag)=>new Promise((resolve, reject)=>{
  const qeury = 'SELECT b.id, b.content, b.img, b.users_email FROM posts_has_hashtag AS a INNER JOIN posts AS b ON a.posts_id = b.id WHERE a.hashtag_title LIKE ?';
  connection.query(qeury, [`%${hashtag}%`], (error, results, fiedls)=>{
    if(error)
      reject(error);
    else
      resolve(results);
  })
})

exports.insertPosts_has_Hashtag = (post_id, hashtag)=>new Promise((resolve, reject)=>{
  const query = 'INSERT INTO posts_has_hashtag VALUES (?, ?)'
  connection.query(query, [post_id, hashtag], (error,results,fiedls)=>{
    if(error)
      reject(error);
    else 
      resolve();
  })
})