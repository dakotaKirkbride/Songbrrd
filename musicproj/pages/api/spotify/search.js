
import spotifyApi from "../../../library/spotify";

let searchResults = [];

export default async function handler(req, res) {

  const searchVal = req.query.searchVal;
  console.log(searchVal);

  await spotifyApi.clientCredentialsGrant()
    .then(function (data) {
      spotifyApi.setAccessToken(data.body['access_token']);
      return spotifyApi.search(
        `${searchVal}`, ['album', 'track', 'artist'], { limit: 4 }
      )
    })
    .then(function (data) {
      searchResults = data.body;
      console.log('searchResults');
      console.log(searchResults);
    }, function (err) {
      console.log('Something went wrong!', err);
    });

  // return searchResults;
  res.status(200).json({items: searchResults})

}