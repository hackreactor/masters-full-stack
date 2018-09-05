var express = require('./express.js');
var bodyParser = require('./bodyParser.js');
var morgan = require('./morgan.js');
var path = require('path');

var app = express();

app.use(morgan);
app.use(bodyParser);

// app.get('/', function (req, res) {
// 	res.send('Hello World!');
// });

app.get('/', function (req, res, next){ res.status(201); next(); }, function (req, res) {
	res.send('Hello World!');
});

app.post('/post', function (req, res) {
	res.send(req.body);
});

app.get('/test', function (req, res) {
	res.sendFile(path.join(__dirname, 'morgan.js'));
});

// app.get('/api/blogs', function(){});

// app.use('/api', function (){
// 	// must be authenticated. If not, return error
// 	// if auth success, invoke next()
// })

// app.post('/api/blogs', function (){})

app.listen(4444);