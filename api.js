'use strict';

const Hapi = require('hapi');
const server = new Hapi.Server();
var queue = require('./helpers/queue');

server.connection({ port: 3000, host: 'localhost' });

server.route({
    method: 'GET',
    path: '/{command}',
    handler: function (request, reply) {
      var options = request.query || {};
      options.command = request.params.command;

      queue.add(options);

      reply(options);
    }
});

server.start((err) => {

    if (err) { throw err; }

    console.log(`Server running at: ${server.info.uri}`);
});
