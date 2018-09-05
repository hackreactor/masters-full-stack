var http = require('http');
var fs = require('fs');

var res = Object.create(http.ServerResponse.prototype);

res.send = function (data) {
	if(typeof data != "string") {
		data = JSON.stringify(data);
	}
	this.end(data);
};

res.sendFile = function (filePath) {
  var that = this;
	fs.readFile(filePath, function(err, data) {
    if(err) {
      next(err);
    } else {
      that.end(data);
    }
  });
};

res.status = function (status) {
	this.statusCode = status;
	return this;
};

module.exports = res;