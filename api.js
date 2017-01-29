'use strict';

const Hapi = require('hapi');
const server = new Hapi.Server();
var Sonos = require('sonos')
var queue = require('./helpers/queue')
var search = Sonos.search()
var Config = require('./config')

var sonos = {};

server.connection(Config.hapi);

server.route({
    method: 'POST',
    path: '/{command}',
    handler: function (request, reply) {
      var options = request.query || {};
      options.command = request.params.command;

      queue.add(options);

      reply(options);
    }
});

server.route({
    method: 'GET',
    path: '/{command}',
    handler: function (request, reply) {
      var command = request.params.command;
      var route = 'get' + command.charAt(0).toUpperCase() + command.slice(1);

      if (command == 'currentTrack') { route = command; }

      if (!sonos[route]) { reply('No Command'); }
      sonos[route](function (err, res) {
        reply({ command: route, response: res});
      });
    }
});

search.on('DeviceAvailable', function (device, model) {
  sonos = new Sonos.Sonos(device.host, device.port);

  server.start((err) => {
      if (err) { throw err; }

      console.log(`Server running at: ${server.info.uri}`);
  });
});
