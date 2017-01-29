var request = require('request-promise');
var cheerio = require('cheerio');

module.exports = function (station) {
  var response = request.get('http://tunein.com/search/?query=' + station);

  return response.then(function (data) {
    var $ = cheerio(data);
    var station = $.find('li.station a').attr('href');

    if (!station) { return false; }

    var parsed = station.match(/\/radio\/(.*)-(.*)\//);
    var out = {
      station: parsed[1],
      id: parsed[2].replace('s', '')
    };

    return out;
  });
}
