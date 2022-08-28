const axios = require('axios')

const params = {
  access_key: '82aefccb770bc3c5b94ec9e01ca9f64a',
  query: 'New York'
}

axios.get('https://api.weatherstack.com/current', {params})
  .then(response => {
    const apiResponse = response.data;
    console.log(`Current temperature in ${apiResponse.location.name} is ${apiResponse.current.temperature}℃`);
  }).catch(error => {
    console.log(error);
  });