// middleware
// payloads
// routing
// recieve information (bodyParser)
// http.Server(pass our app object in)

var http = require('http');

module.exports = function(){
	var app = {};

	var handlerArray = [];

	/*
	{
		route: '/',
		methods: [
			function (req, res, next){ next(); },
			function (req, res) { res.send('Hello World!'); }
		]
	}
	*/

	app.use = function (...rest) {
		if(typeof rest[0] === 'function') {
			handlerArray.push({
				route: '*',
				type: '*',
				methods: rest
			});
		} else if (typeof rest[0] === 'string') {
			handlerArray.push({
				route: rest.shift(),
				type: '*',
				methods: rest
			});
		} else {
			// ERROR HANDLER
		}
	};

	app.get = function (route, ...rest) {
		handlerArray.push({
			route: route,
			type: 'GET',
			methods: rest
		});
	};

	app.post = function (route, ...rest) {
		handlerArray.push({
			route: route,
			type: 'POST',
			methods: rest
		});
	};

	app.listen = function (port) {
		var server = http.createServer(function (request, response) {
			var conveyer = function (i=0) {
				if(handlerArray[i].route === request.url && handlerArray[i].type === request.type) { //TODO: make sure url is in format that we like
					var x = 0;

					var next = function () {
						x++;
						if(x >= handlerArray.[i].methods.length) {
							conveyer(++i);
						} else {
							handlerArray[i].methods[x](request, response, next);
						}
					};

					handlerArray[i].methods[x](request, response, next);
				} else {
					conveyer(++i);
				}
			};
			conveyer(0);
		});
		server.listen(port);
	};

	return app;
};

/*
[]
*/