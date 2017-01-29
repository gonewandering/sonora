var RSMQ = require('rsmq')
var Config = require('../config')

var rq = new RSMQ(Config.redis)

rq.createQueue({qname: 'sonora-queue'}, function (err, data) { });

module.exports = {
  connections: [],

  add: function (message) {
    var string = JSON.stringify(message);

    return new Promise(function (success, cat) {
      rq.sendMessage({qname: 'sonora-queue', message: string}, success);
    });
  },

  connect: function (subscription) {
    this.connections.push(subscription);
  },

  get: function () {
    var self = this;

    rq.popMessage({qname: 'sonora-queue'}, function (err, message) {
      if (!message || !message.message) { return false; }

      var obj = JSON.parse(message.message);

      self.connections.forEach(function (sub) {
        sub(obj);
      });
    });
  },

  listen: function () {
    setInterval(this.get.bind(this), 200);
  }
}
