const { fetchMyIP, fetchMyGeo, fetchISSFlyOverTimes } = require('./iss');

const myIp = fetchMyIP((err, ip) => {
  if (err) {
    console.log('It didn\'t work!:', err);
  }

  fetchMyGeo(ip, (err, data) => {
    if (err) {
      console.log('It didn\'t work!:', err);
    }

    console.log(data); 
    
    fetchISSFlyOverTimes(data, (err, flyTimes) => {
      if (err) {
        console.log('It didn\'t work!:', err);
      }

      console.log(flyTimes);
    })
  });
});

