const mysqlConnObj = require('./mysql');
const crypto = require('crypto');
const mysqlConn = mysqlConnObj.init();
require('dotenv').config();

exports.insertUser = (data, callback) => {
    let password_crypt = crypto.createHmac('sha256', data.password).update(process.env.SECRET_SHA).digest('hex');
    let sql = "INSERT INTO node_project.users ( userid, name, password ) VALUES ( ?, ?, ? )";
    this.selectUser(data.email, (results) => {
      if( results[0].userid === data.email ) {
        callback("ERR_ALREADY_EXISTS");
      } else {
        mysqlConn.query(sql, [data.email, data.name, password_crypt ], (err, results, fields) => {
          if (err) {
            console.error('Error code : ' + err.code);
            console.error('Error Message : ' + err.message);
        
            throw new Error(err);
          } else {
            callback(JSON.parse(JSON.stringify(results)))
          }
        })
      }
    })
}

exports.selectUser = (email, callback) => {
    let sql = "SELECT * FROM node_project.users WHERE userid = ?";
    mysqlConn.query(sql, email, (err, results, fields) => {
        if (err) {
            console.error('Error code : ' + err.code);
            console.error('Error Message : ' + err.message);
        
            throw new Error(err);
          }
        else if(!results.length){
          callback("ERR_NO_USER");
        } else {
          callback(JSON.parse(JSON.stringify(results)));
        }
    })
}
