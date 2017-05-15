var express  = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var port = process.env.PORT || 8000;

app.use(express.static(path.join(__dirname, 'client')));
app.use( express.static( path.join(__dirname, 'bower_components')));
app.use(bodyParser.json());

app.listen(port, function() {
  console.log('Server running on port ${ port }');
});

