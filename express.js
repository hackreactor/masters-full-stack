// middleware
// payloads
// routing
// recieve information (bodyParser)
// http.Server(pass our app object in)

// TODO for next week: bodyParser, morgan, staticFiles
// Continuing on: dbs, front-end

var http = require('http');
var res = require('./response');

module.exports = function(){
	var handlerArray = [];

	var app = function (request, response) {

		Object.setPrototypeOf(response, res);

		var conveyer = function (i) {
			if((handlerArray[i].route === request.url || handlerArray[i].route === '*') && (handlerArray[i].type === request.method || handlerArray[i].type === '*')) { 
        var x = 0;

				var next = function () {
					x++;
					if(x >= handlerArray[i].methods.length) {
						conveyer(++i);
					} else {
						handlerArray[i].methods[x](request, response, next);
					}
				};

				handlerArray[i].methods[x](request, response, next);
			} else if(i < handlerArray.length - 1) {
				conveyer(++i);
			} else {
				response.status(404).send('404 ERROR');
			}
		};
		conveyer(0);
	};

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
		var server = http.createServer(app);
		server.listen(port);
	};

	return app;
};

/*
[]
*/