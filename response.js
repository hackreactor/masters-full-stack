var http = require('http');

var res = Object.create(http.ServerResponse.prototype);

res.send = function (data) {
	if(typeof data != "string") {
		data = JSON.stringify(data);
	}
	this.end(data);
};

res.status = function (status) {
	this.statusCode = status;
	return this;
};

module.exports = res;