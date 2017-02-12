module.exports = {
  api: {
    url: 'http://0.0.0.0:5005/'
  },

  queueFile: 'https://s3.amazonaws.com/sonos-communicator/actions',

  zoneAliases: {
    all: [
      'all',
      'kitchen and living room',
      'living room and kitchen'
    ]
  },

  stations: [
    'kqed',
    'wnyc'
  ]
}
