var connection = require('./db')

// exports.selectDrama = function(cb){
//     connection.query('SELECT * FROM drama', function (error, results, fields) {
//         if(error){
//             console.log(error);
//         }else{
//             cb(results);
//         }
//     });
// }

exports.selectDrama = (body) => new Promise( (resolve, reject) => {
    connection.query('SELECT * FROM drama', (err, result) => {
        if( err ) reject( err );
        else resolve(result);
    });
})

// exports.insertDrama = function(body, cb){
//     sql = 'INSERT INTO drama (title, actor) VALUES(?, ?)';
//     values = [body.title, body.actor];
//     connection.query(sql, values, function(error, results, fields){
//         if(error){
//             console.log(error);
//         }else{
//             cb(results);
//         }
//     })
// }

exports.insertDrama = (body) => new Promise( (res, rej) => {
    sql = 'INSERT INTO drama (title, actor) VALUES(?, ?)';
    values = [body.title, body.actor];
    connection.query(sql, values, (err, results) => {
        if(err) rej( err );
        else res(results);
    });
})

// exports.updateDrama = function(id, body, cb){
//     sql = `UPDATE drama SET title = ?, actor = ? WHERE id = ?`;
//     values = [body.title, body.actor, id];
//     connection.query(sql, values, function(error, results, fields){
//         if(error){
//             console.log('UPDATE ERROR');
//         }else{
//             cb();
//         }
//     })
// }

exports.updateDrama = (id, body) => new Promise ( (res, rej) => {
    sql = `UPDATE drama SET title = ?, actor = ? WHERE id = ?`;
    values = [body.title, body.actor, id];
    connection.query(sql, values, (err, results) => {
        if(err) rej( err );
        else res(results);
    });
});

// exports.deleteDrama = function(id, cb){
//     sql = `DELETE FROM drama WHERE id = ${id}`;
//     connection.query(sql, function(error, results, fields){
//         if(error){
//             console.log('DELETE ERROR');
//         }else{
//             cb();
//         }
//     })
// }

exports.deleteDrama = (id) => new Promise( (res, rej) => {
    sql = `DELETE FROM drama WHERE id = ${id}`;
    connection.query(sql, (err, results) => {
        if(err) rej( err );
        else res(results);
    })
})