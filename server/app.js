var path = require('path');
var express = require('express');
var app = express();
var config = require('./config/config.js');
var env = process.env.NODE_ENV || 'development';

app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env == 'development';

app.set('views', config.appRoot + '/templates/');

app.set('view engine', 'ejs');

app.use('/app', express.static(path.join(__dirname, '../app')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../app/index.html'));
});

app.listen(config.SERVER_PORT, function() {
  console.log('listening at http:localhost:3001');
});
