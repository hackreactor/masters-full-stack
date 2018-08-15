var express = require('./express.js');

var app = express();

app.get('/', function (req, res, next){ next(); }, function (req, res) {
	res.send('Hello World!');
});

// app.get('/api/blogs', function(){});

// app.use('/api', function (){
// 	// must be authenticated. If not, return error
// 	// if auth success, invoke next()
// })

// app.post('/api/blogs', function (){})

app.listen(3000);