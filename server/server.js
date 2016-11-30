var express = require('express');
var app = express();
var SpotifyWebApi = require('spotify-web-api-node');
var config = require("./config");

app.use("/", express.static("build"));

var spotifyApi = new SpotifyWebApi({
  clientId : config.spotify.clientID,
  clientSecret : config.spotify.clientSecret,
  redirectUri : config.spotify.callbackURL
});

app.get("/api", function(req, res) {
	// searchTracks (can be changed) specify's search key word
  // we should add a query "request.query" as a parametre
  //add query to body**

  //var q = req.query.q (this allows us to search by query + search variable in the url endpoint)
  var q = req.query.q
  //the arguement q in searchTracks(arguement) is the search term for the get request
	spotifyApi.searchTracks(q)
  .then(function(data) {
    console.log('Artist albums', data.body);
    res.send(data.body);
  }, function(err) {
    console.error(err);
  });

});

app.listen(process.env.PORT || 8080, function() {

});