var connection = require('./db')

exports.selectUser = (user_email) => new Promise((resolve, reject)=>{
  connection.query('SELECT * FROM users WHERE email = ?', [user_email], function(error, results, fields){
    if(error)reject(error);
    else resolve(results);
  })
})

exports.insertUser=(values) => new Promise((resolve,reject)=>{
  console.log('exports.insertUser=(values)', values)
  const query = 'INSERT INTO users(email, nick, password) VALUES (?, ?, ?)'
  
  connection.query(query, values, function(error,results,fiedls){
    if(error)reject(error);
    else resolve();
  })
})

exports.insertFollowing = (follower_id, following_id) => new Promise((resolve, reject) => {
  const query = 'INSERT INTO follow VALUES (?, ?)'
  connection.query(query, [follower_id, following_id], function(error,results,fiedls){
    if(error)
      reject(error);
    else 
      resolve();
  })
});

exports.selectFollow = (user_email)=>new Promise((resolve, reject)=>{
	connection.query('SELECT * FROM follow WHERE follower_id = ? or following_id = ?', [user_email, user_email], function(error, results, fields){
    if(error)
		  reject(error);
    else 
		  resolve(results);
  })
})

exports.selectFollowingList = (user_email)=>new Promise((resolve, reject)=>{
	const query = 'SELECT b.nick FROM follow AS a INNER JOIN users AS b ON a.following_id = b.email WHERE a.follower_id = ?';
	connection.query(query, [user_email], function(error, results, fields){
    if(error)
		  reject(error);
    else 
		  resolve(results);
  })
})

exports.selectFollowerList = (user_email)=>new Promise((resolve, reject)=>{
	const query = 'SELECT b.nick FROM follow AS a INNER JOIN users AS b ON a.follower_id = b.email WHERE a.following_id = ?';
	connection.query(query, [user_email], function(error, results, fields){
    if(error)
		  reject(error);
    else 
		  resolve(results);
  })
})