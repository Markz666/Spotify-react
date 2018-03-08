
const request = require('request'); // "Request" library

export const searchForTracks = (authOptions, name) => {
  return new Promise((resolve, reject) => {
    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        // use the access token to access the Spotify Web API
        const token = body.access_token;
        const options = {
          url: `https://cs-554-spotify-proxy.herokuapp.com/v1/search?q=${name}&type=track`,
          headers: {
            'Authorization': 'Bearer ' + token
          },
          json: true
        };
        request.get(options, function(error, response, body) {
          resolve(body.tracks.items);  
        });
      }
    });
  });
}

export const getTrack = (authOptions, id) => {
  return new Promise((resolve, reject) => {
    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        // use the access token to access the Spotify Web API
        const token = body.access_token;
        const options = {
          url: `https://cs-554-spotify-proxy.herokuapp.com/v1/tracks/${id}`,
          headers: {
            'Authorization': 'Bearer ' + token
          },
          json: true
        };
        request.get(options, function(error, response, body) {
          resolve(body);  
        });
      }
    });
  });
}

export const getArtist = (authOptions, id) => {
  return new Promise((resolve, reject) => {
    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        // use the access token to access the Spotify Web API
        const token = body.access_token;
        const options = {
          url: `https://cs-554-spotify-proxy.herokuapp.com/v1/artists/${id}`,
          headers: {
            'Authorization': 'Bearer ' + token
          },
          json: true
        };
        request.get(options, function(error, response, body) {
          resolve(body);  
        });
      }
    });
  });
}

export const getAlbum = (authOptions, id) => {
  return new Promise((resolve, reject) => {
    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        // use the access token to access the Spotify Web API
        const token = body.access_token;
        const options = {
          url: `https://cs-554-spotify-proxy.herokuapp.com/v1/albums/${id}`,
          headers: {
            'Authorization': 'Bearer ' + token
          },
          json: true
        };
        request.get(options, function(error, response, body) {
          resolve(body);  
        });
      }
    });
  });
}


// async function test(authOptions,id){
//   let t = await getTrack(authOptions, id);
//   console.log(t);
// }
// test(authOptions, "2vRncwwsqrQQ9WyXYEOXhQ");
