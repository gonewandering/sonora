var request = require('request-promise');
var queue = require('./helpers/queue');
var config = require('./config');
var currentMessage = {};

function checkS3() {
  request.get('https://s3.amazonaws.com/sonos-communicator/actions').then(function (d) {
    var message = JSON.parse(d);

    if (currentMessage != d) {
      request.post({
        url: config.api.url + '/' + message.command,
        qs: message
      });
    }

    currentMessage = d;
  });
}

function init() {
  var app = setInterval(checkS3, 1000);
}

init();
