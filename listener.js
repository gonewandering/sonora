var request = require('request-promise');
var queue = require('./helpers/queue');
var config = require('./config');
var currentMessage = {};
var n = 0;

function checkS3() {
  request.get('https://s3.amazonaws.com/sonos-communicator/actions').then(function (d) {
    var message = JSON.parse(d);

    if (currentMessage != d && n > 0) {
      getGroup(message).then(runQuery);
    }

    n++;
    currentMessage = d;
  });
}

function getGroup(message) {
  let allZones = [
    'all',
    'kitchen and living room',
    'living room and kitchen'
  ];

  if (allZones.indexOf(message.zones) > -1) {
    if (message.command == 'volume') {
      message.command = 'groupVolume';
    }

    message.zones = 'kitchen'

    return request.get(config.api.url + 'preset/all').then(function (d) {
      return message;
    }).catch(function (e) {
      throw e;
    });
  }

  return new Promise(function (resolve, reject) {
    if (1 == 2) { reject() }
    resolve(message)
  })
}

function assembleQuery(message) {
  let actions = {
    play: function (message) {
      return [
        message.zones,
        'musicsearch',
        (message.source || 'spotify'),
        (message.type || 'station'),
        message.search
      ]
    },
    volume: function (message) {
      return [
        message.zones,
        'volume',
        message.search
      ]
    },
    groupVolume: function (message) {
      return [
        message.zones,
        'volume',
        message.search
      ]
    },
    general: function (message) {
      return [
        message.zones,
        message.command
      ]
    }
  };

  return actions[message.command] ? actions[message.command](message) : actions.general(message)
}

function runQuery(message) {
  let query = assembleQuery(message) || [];

  console.log(query);

  return request.get({
    url: config.api.url + query.join('/')
  }).then(function (d) { console.log(d); })
  .catch(function (err) {console.log(err); });
}

function init() {
  var app = setInterval(checkS3, 2000);
}

init();
