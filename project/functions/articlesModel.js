// mysql 연결
const mysqlConnObj = require('./mysql');
const mysqlConn = mysqlConnObj.init();
// mysqlConnObj.open(mysqlConn); // 정상적으로 연결되었는지 확인

getKorTime = () => {
  let now = new Date();
  let utc = now.getTime() + (now.getTimezoneOffset() * 60 * 1000);
  now = new Date(utc + 9 * 60 * 60 * 1000);
  return now;
};

exports.insertData = (data, callback) => {
    let now = getKorTime();
    let sql = 'INSERT INTO node_project.articles ( title, body, email, createdAt ) VALUES (?, ?, ?, ?)';
    let bindParam = [
      data.title,
      data.body,
      data.email,
      now
    ];

    mysqlConn.query(sql, bindParam, (err, results, fields) => {
      if (err) {
        console.error('Error code : ' + err.code);
        console.error('Error Message : ' + err.message);
    
        throw new Error(err);
      } else {
        callback(JSON.parse(JSON.stringify(results)));
      }
    });
};
    /*
    *
    * 위 코드에서 result 의 값으로 넘어오는 것들
    *
    *  fieldCount: 0,
    *  affectedRows: 1, // 성공한 개수
    *  insertId: 2,
    *  serverStatus: 2,
    *  warningCount: 0,
    *  message: '',
    *  protocol41: true,
    *  changedRows: 0
    */

exports.getList = (callback) => {
    let sql = 'SELECT * FROM node_project.articles ORDER BY createdAt DESC'; // LIMIT N //추후 페이징 기법 사용
    mysqlConn.query(sql, (err, results, fields) => {
        if (err) {
            console.error('Error code : ' + err.code);
            console.error('Error Message : ' + err.message);
    
            throw new Error(err);
        } else {
            callback(JSON.parse(JSON.stringify(results)));
        }
        });
};

exports.getArticle = (id, callback) => {
  let sql = 'SELECT * FROM node_project.articles WHERE id = ?';
  mysqlConn.query(sql, id, (err, res, fields) => {
    if(err) {
      console.error('Error code : ' + err.code);
      console.error('Error Message : ' + err.message);

      throw new Error(err);
    } else {
      callback(JSON.parse(JSON.stringify(res)));
    }
  })
}

exports.updateArticle = (req, id, callback) => {
  let now = getKorTime();
  let sql = "UPDATE node_project.articles SET title = ?, body = ?, updatedAt = ? WHERE id = ?";
  mysqlConn.query(sql, [ req.title, req.editordata, now, id], (err, res, fields) => {
    if(err) {
      console.error('Error code : ' + err.code);
      console.error('Error Message : ' + err.message);

      throw new Error(err);
    } else {
      callback(JSON.parse(JSON.stringify(res)));
    }
  });
}

exports.deleteArticle = (id, callback) => {
  let sql = "DELETE FROM node_project.articles WHERE id = ?";
  mysqlConn.query(sql, id, (err, res, fields) => {
    if(err) {
      console.error('Error code : ' + err.code);
      console.error('Error Message : ' + err.message);

      throw new Error(err);
    } else {
      callback(JSON.parse(JSON.stringify(res)));
    }
  });
}