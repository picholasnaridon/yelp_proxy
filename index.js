const express = require('express')
const path = require('path')
var request = require('request');
require('dotenv').load();
const PORT = process.env.PORT || 5000
var app = express()

 
var options = {
  url: 'https://api.yelp.com/v3/businesses/living-water-massage-philadelphia/reviews',
  headers: {
    'Authorization': 'Bearer ' + process.env.BEARER
  }
};

var info;
function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
    info = JSON.parse(body);
  }
}
 
var results = request(options, callback);

app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next()
})

app.get ('/yelp', (req, res, next) => res.json(info))

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))

