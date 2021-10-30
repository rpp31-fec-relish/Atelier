const path = require("path");
const https = require('https');
const express = require("express");
const app = express();
const token = require('./githubtoken.js');

// serves the static client page
app.use(express.static(path.join(__dirname, "client/dist")));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const API_URL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/';

// accepts url and forwards to hackreactor's api, with the github token
// as an authorization header.
// example: to use the api at
// https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products?count=10
// then use
// https://localhost:3000/api/products?count=10

app.all('/api/*', (req, res) => {
  console.log(`Accepting ${req.method} call to API:`, req.url);
  //console.log(req.headers);
  let reqHeaders = {
    Authorization: token,
  };
  if (req.method === 'POST') {
    reqHeaders['Content-Type'] = 'application/json';
    reqHeaders['mode'] = 'cors';
  }
  const apiReq = https.request(new URL(API_URL + req.url.substring(5)), {
    headers: reqHeaders,
    method: req.method
  }, (response) => {
    console.log('RESPONSE: ', response.statusCode);
    let body = [];
    response.on('data', (chunk) => {
      body.push(chunk);
    }).on('end', () => {
      body = Buffer.concat(body).toString();
      console.log('response body: ', body);
      res.status(response.statusCode).send(body);
    }).on('error', (err) => {
      console.error(err);
    });
  });
  if (req.method === 'POST') {
    if (Object.keys(req.body).length != 0) {  //non empty object
      console.log(JSON.stringify(req.body));
      apiReq.write(JSON.stringify(req.body));
    }
  }
  apiReq.on('error', (err) => {
    console.error(err);
  });
  apiReq.end();

});

console.log('Server started on port 3000');
app.listen(3000);