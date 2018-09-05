module.exports = function (req, res, next) {
  var data = [];
  req.on('data', function (chunk) {
    data.push(chunk);
  });

  req.on('end', function () {
    try {
      req.body = JSON.parse(Buffer.concat(data).toString());
    } catch (err) {
      // nothing
    }
    
    next();
  });
}