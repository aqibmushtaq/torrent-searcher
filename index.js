var tpb     = require('thepiratebay'),
    express = require('express'),
    log4js  = require('log4js'),
    http    = require('http'),
    fs      = require('fs'),
    cors    = require('cors'),
    app     = express();

//set up logger
log4js.configure({
  "appenders": [
    {type: "console", category: "console"},
    {type: "file", filename: 'logs/server.log', maxLogSize: 104857600, backups: 100}
  ]
});
var logger = log4js.getLogger('trace');

app.use(cors());
app.use(function(req, res, next) {
  logger.info('%s %s', req.method, req.url);

  // Website you wish to allow to connect
  // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,token');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});
app.set('tpb', tpb);
app.set('port', 8084);
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);

//attach all routes
fs.readdirSync('./controllers').forEach(function (file) {
  if(file.substr(-3) == '.js') {
    route = require('./controllers/' + file);
    route.controller(app);
  }
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
