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

      sonos[message.zones].playTuneinRadio(Number(result.id), result.station);

      return true;
    })
  },

  spotify: function (message) {
    return Spotify.artist(message.search).then(function (result) {
      if (!result.id) { return false; }

      sonos[message.zones].playSpotifyRadio(result.id, result.station);
      return true;
    });
  }
}

var commands = {
  play: function (message) {
    console.log(message);

    if (!message.service) {
      sonos[message.zones].play(function () { })
      return;
    }

    services[message.service](message);
  },
  pause: function (message) {
    sonos[message.zones].pause(function () { })
  },
  next: function (message) {
    sonos[message.zones].next(function () { })
  },
  previous: function (message) {
    sonos[message.zones].previous(function () { })
  },
  volume: function (message) {
    sonos[message.zones].setVolume(message.volume, function () { });
  }
}

var clean = function (message) {
  message.service = message.service || 'spotify';
  message.zones = message.zones || 'living room';
  return message;
}

var getMessage = function (message) {
  message = clean(message);
  commands[message.command] && commands[message.command](message);
}

search.on('DeviceAvailable', function (device, model) {
  var sonosDevice = new Sonos.Sonos(device.host, device.port);

  sonosDevice.getZoneAttrs(function (err, data) {
    sonosDevice.name = data.CurrentZoneName.toLowerCase();
    sonos[sonosDevice.name] = sonosDevice;

    queue.connect(getMessage);
  });
});

queue.listen();
