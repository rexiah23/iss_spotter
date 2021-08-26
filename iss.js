/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const request = require('request');

const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request('https://api.ipify.org?format=json', (err, res, body) => {

    if (err) {
      return callback(err, null);
    }
  
    if (res.statusCode !== 200) {
      const msg = `Status Code ${res.statusCode} when fetching IP. Response: ${body}`;
      return callback(Error(msg), null);
    }

    const ip = JSON.parse(body).ip;
    return callback(null, ip);
  });
};

const fetchMyGeo = function(ip, callback) {
  request('https://freegeoip.app/json/' + ip, (err, res, body) => {

    if (err) {
      return callback(err, null);
    }

    if (res.statusCode !== 200) {
      const msg = `Status Code ${res.statusCode} when fetching IP. Response: ${body}`;
      return callback(Error(msg), null);
    }

    const data = { latitude: JSON.parse(body).latitude, longitude: JSON.parse(body).longitude };

    return callback(null, data);
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  const { latitude, longitude } = coords; 
  request(`http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`, (err, res, body) => {
    http://api.open-notify.org/iss-pass.json?lat=43.8304&lon=-79.504 
    if (err) {
      return callback(err, null);
    }

    if (res.statusCode !== 200) {
      const msg = `Status Code ${res.statusCode} when fetching IP. Response: ${body}`;
      return callback(Error(msg), null);
    }

    const flyTimes = JSON.parse(body).response; 

    return callback(null, flyTimes);

})
}



module.exports = { fetchMyIP, fetchMyGeo, fetchISSFlyOverTimes };

