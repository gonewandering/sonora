var Sonos = require('sonos')
var queue = require('./helpers/queue')
var search = Sonos.search()

var Tunein = require('./helpers/tunein')
var Spotify = require('./helpers/spotify')

var sonos = {}

var services = {
  tunein: function (message) {
    return Tunein(message.search).then(function (result) {
      if (!result.id) { return false; }

      sonos.playTuneinRadio(Number(result.id), result.station);

      return true;
    })
  },

  spotify: function (message) {
    return Spotify.artist(message.search).then(function (result) {
      if (!result.id) { return false; }

      sonos.playSpotifyRadio(result.id, result.station);
      return true;
    });
  }
}

var commands = {
  play: function (message) {
    if (!message.service) {
      sonos.play(function () { })
      return;
    }

    services[message.service](message);
  },
  pause: function (message) {
    sonos.pause(function () { })
  },
  next: function (message) {
    sonos.next(function () { })
  },
  previous: function (message) {
    sonos.previous(function () { })
  },
  volume: function (message) {
    sonos.setVolume(message.volume, function () { });
  }
}

var getMessage = function (message) {
  commands[message.command] && commands[message.command](message);
}

search.on('DeviceAvailable', function (device, model) {
  sonos = new Sonos.Sonos(device.host, device.port);
  queue.connect(getMessage);
});

queue.listen();
