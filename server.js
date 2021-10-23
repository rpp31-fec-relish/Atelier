const path = require("path");
const https = require('https');
const express = require("express");
const app = express();
const token = require('./githubtoken.js');

// serves the static client page
app.use(express.static(path.join(__dirname, "client/dist")));

const URL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/';

// accepts url and forwards to hackreactor's api, with the github token
// as an authorization header.
// example: to use the api at
// https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products?count=10
// then use
// https://localhost:3000/api/products?count=10
app.get('/api/*', (req, res) => {
  console.log('Accepting GET call to API:', req.url);
  https.get(URL + req.url.substring(5), {
    headers: {
      Authorization: token
    }
  }, (response) => {
    let body = [];
    response.on('data', (chunk) => {
      body.push(chunk);
    }).on('end', () => {
      body = Buffer.concat(body).toString();
      res.send(body);
    });
  });
});

app.post('/api/*', (req, res) => {
  // todo... the only POST we will need to make to the API
  // is adding to cart?
});

console.log('Server started on port 3000');
app.listen(3000);