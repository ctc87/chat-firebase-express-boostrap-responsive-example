var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();

app.set('view engine', 'pug')
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());     

var loged = false;
app.get('/', function (req, res) {
    // console.log(loged)
    res.render('index', { Itsloged: loged});
});


app.get('/login', function (req, res) {
  loged = req.query.loged;
  // console.log(loged)
});


app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});