const express = require('express');
const path = require('path');
const app = express();             
const port = 3000

var indexRouter = require('./routes/index');
var birds = require('./routes/birds');

app.use('/', indexRouter);
app.use('/birds', birds);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})  