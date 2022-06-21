let express = require('express');
let router = express.Router();
let path = require('path');
let fs = require('fs/promises');

/* GET users listing. */

let arr = [];
( async() => {

  let nameArray = await fs.readFile(path.dirname(__filename)+"\\학생이름.csv");
  arr = nameArray.toString().split(',');

  router.get('/', function(req, res, next) {
    res.render('users', { title: "학생이름" ,name: arr});
  });

})();   




module.exports = router;
// 박지민