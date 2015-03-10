'use strict';

var express = require('express');

var app = express();

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);

app.get('/', function (req, res)
{
  if (!res.getHeader('Cache-Control')){
    res.setHeader('Cache-Control', 'public, max-age=' + (0));
    res.render(__dirname + '/index.html');
  }
});

app.use(express.static(__dirname, {maxAge: 0}));

app.listen(process.env.PORT || 5000);
