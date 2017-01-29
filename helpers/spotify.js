var SpotifyWebApi = require('spotify-web-api-node');
var spotifyApi = new SpotifyWebApi();
module.exports = {};

module.exports.artist = function (artist) {
  return spotifyApi.searchArtists(artist)
  .then(function(data) {
    if (!data.body.artists.items) { return false; }
    var artist = data.body.artists.items[0];

    return {
      id: artist.id,
      station: artist.name
    }
  });
}
