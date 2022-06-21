var connection = require('./db')

exports.selectDrama = ()=> new Promise((resolve, reject)=>{
    let sql = 'SELECT * FROM drama';
    connection.query(sql, (error, results, fields)=>{
      if(error){
        reject(error);
      }else{
        resolve(results);
      }
    })
})

exports.insertData = (title, actor)=>new Promise((resolve, reject)=>{
  let sql = 'INSERT INTO drama (title, actor) VALUES(?, ?)';
  connection.query(sql, [title, actor], function(err, results, fields){
    if(err)
      reject(err)
    else
      resolve();
  })
})

exports.updateDrama = (id, body)=>new Promise((resolve, reject)=>{
  let sql = `UPDATE drama SET title = ?, actor = ? WHERE id = ?`;
  values = [body.title, body.actor, id];
  connection.query(sql, values, function(error, results, fields){
    if(error){
        console.log('UPDATE ERROR');
    }else{
        resolve();
    }
  })
})

exports.deleteDrama = (id)=>new Promise((resolve, reject)=>{
  sql = `DELETE FROM drama WHERE id = ${id}`;
  connection.query(sql, function(error, results, fields){
      if(error){
          console.log('DELETE ERROR');
          reject();
      }else{
          resolve();
      }
  })
});