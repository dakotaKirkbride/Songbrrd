
// reference: https://github.com/thelinmichael/spotify-web-api-node

var SpotifyWebApi = require('spotify-web-api-node');
var clientId = process.env.SPOTIFY_CLIENT_ID;
var clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

// Create the api object with the credentials
var spotifyApi = new SpotifyWebApi({
  clientId: clientId,
  clientSecret: clientSecret
});

// Get an access token and 'save' it using a setter
spotifyApi.clientCredentialsGrant().then(
  function(data) {
    console.log('The access token is ' + data.body['access_token']);
    spotifyApi.setAccessToken(data.body['access_token']);
  },
  function(err) {
    console.log('Something went wrong!', err);
  }
);

export default spotifyApi;

