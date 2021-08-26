const request = require('request-promise-native');

const fetchMyIP = () => request('https://api.ipify.org?format=json');

const fetchMyGeo = (body) => {
  console.log("FETCH MY GEO WORKED")
  const ip = JSON.parse(body).ip;
  return request('https://freegeoip.app/json/' + ip);
}

const fetchISSFlyOverTimes = (body) => {
  console.log("FETCH ISS WORKED!")
  const { latitude, longitude } = JSON.parse(body)
  const url = `http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`;
  return url;
}

const nextISSTimesForMyLocation = () => {
  return fetchMyIP()
  .then(fetchMyGeo)
  .then(fetchISSFlyOverTimes)
  .then((data) => {
    console.log('FINAL THEN WORKED!')
    const { response } = JSON.parse(data); 
    return response;
  })
}

module.exports = { nextISSTimesForMyLocation }