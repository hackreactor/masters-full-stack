// :method :url :status :response-time ms

module.exports = function (req, res, next) {
  var start = new Date();
  var oldEnd = res.end;
  res.end = function (...rest) {
    oldEnd.apply(this, rest);
    var end = new Date();
    console.log(`${req.method} ${req.url} ${res.statusCode} ${end-start}`);
  }
  next();
}