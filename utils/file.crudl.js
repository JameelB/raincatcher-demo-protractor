var request = require('request');
var defer = protractor.promise.defer();
var sampleImg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAIAAAD/gAIDAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpBMkIwRDU3OUMxOTYxMUUzODQwNkNEQTZDMzEzNUExMyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpBMkIwRDU3QUMxOTYxMUUzODQwNkNEQTZDMzEzNUExMyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkEyQjBENTc3QzE5NjExRTM4NDA2Q0RBNkMzMTM1QTEzIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkEyQjBENTc4QzE5NjExRTM4NDA2Q0RBNkMzMTM1QTEzIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+yjCY2QAAADhJREFUeNrswQENAAAAwqD3T20ON6AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH5MAAEGAHWUAAHl+yxNAAAAAElFTkSuQmCC";


function addFile() {
  var options = {
    method: 'POST',
    url: 'http://localhost:8001/file/wfm/owner/testUser/upload/base64/photo.png',
    data: sampleImg
  };

  console.log('>>>>>>> creating file ', options.url);
  request.post(options.url, options, function(err, msg) {
    if (err || msg.statusCode >=400) {
      console.log('>>>>>>> failed to create file ', err);
      defer.reject({
        error: err,
        message: msg
      });
    } else {
      console.log('>>>>>>> successfully created file');
      defer.fulfill(msg);
    }
  });
  return defer.promise;
}

module.exports.create = function() {
  addFile();
};
