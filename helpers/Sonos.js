var Sonos = require('sonos')
var search = Sonos.search()

var Tunein = require('./tunein')

var SonosClass = class {
  constructor() {
    this.loading = true

    this.connect().then(function (devices) {
      this.devices = devices
      this.loading = false
      console.log('Sonos Speakers Connected')
    }.bind(this))
  }

  connect(message) {
    var devices = []

    return new Promise(makeConnection)

    function makeConnection(resolve, reject) {
      search.on('DeviceAvailable', function (device, model) {
        var sonosDevice = new Sonos.Sonos(device.host, device.port);

        sonosDevice.getZoneAttrs(function (err, data) {
          sonosDevice.name = data.CurrentZoneName.toLowerCase();
          devices[sonosDevice.name] = sonosDevice;
        })
      })

      setTimeout(function () {
        resolve(devices);
      }, 2500);
    }
  }

  tunein(message) {
    let devices = this.devices
    if (this.loading) { console.log('SONOS Still Connecting') }

    Tunein(message.search).then(result => {
      if (!result.id) { return false; }
      devices[message.zones].playTuneinRadio(Number(result.id), result.station);

      return true;
    })
  }
}

module.exports =  SonosClass
