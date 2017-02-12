var request = require('request-promise');
var config = require('./config');
var Sonos = require('./helpers/Sonos');
var sonos = new Sonos();

var ts = {};
var n = 0;
var group = null;


/**
 * [getGroup description]
 * Check to see if messages sepcifies a group of speakers and group accordingly.
 * Right now only functionality is "all"
 *
 * @param  {[type]} message [description]
 * @return {[type]}         [description]
 */
function getGroup(message) {
  let configAll = config.api.url + 'preset/all'
  let allZones = config.zoneAliases.all

  let notCoupled = (resolve, reject) => {
    return resolve(message)
    return reject(message)
  }

  group = message.zones || group
  message.zones = message.zones || group || 'kitchen'

  if (allZones.indexOf(message.zones) == -1) {
    return new Promise(notCoupled)
  }

  if (message.command == 'volume') {
    message.command = 'groupVolume'
  }

  return request.get(configAll).then(function (d) {
    message.zones = 'kitchen'
    return message
  }).catch(function (e) {
    throw e
  })
}


/**
 * [assembleQuery description]
 * Assemble URL query based on message contents
 * @param  {[type]} message [description]
 * @return {[type]}         [description]
 */
function assembleQuery(message) {
  let actions = {
    play: message => {
      if (config.stations.indexOf(message.search.toLowerCase()) > -1) {
        return sonos.tunein(message)
      }

      return [
        message.zones,
        'musicsearch',
        (message.source || 'spotify'),
        (message.type || 'station'),
        message.search
      ]
    },
    volume: message => {
      return [
        message.zones,
        'volume',
        message.search
      ]
    },
    groupVolume: message => {
      return [
        message.zones,
        'volume',
        message.search
      ]
    },
    general: message => {
      return [
        message.zones,
        message.command
      ]
    }
  };

  if (actions[message.command]) {
    return actions[message.command](message)
  }

  return actions.general(message)
}



/**
 * [runQuery description]
 * Run Query against API to initiatie change.
 * @param  {[type]} message [description]
 * @return {[type]}         [description]
 */
function runQuery(message) {
  let query = assembleQuery(message) || [];
  if (!query[0]) { return; }

  return request.get({
    url: config.api.url + query.join('/')
  }).then(d => { console.log(d); })
  .catch(err => { console.log(err); });
}



/**
 * Look for changes in queue file
 * @return {[type]} [description]
 */
function checkQueue() {
  let checked = (d) => {
    var message = JSON.parse(d);

    ts != message.ts && n > 0 && getGroup(message).then(runQuery);
    n++; ts = message.ts;
  }

  request.get(config.queueFile).then(checked);
}



/**
 * Initialize the whole thing...
 * @return {[type]} [description]
 */
function init() {
  var app = setInterval(checkQueue, 2000);
}

init();
