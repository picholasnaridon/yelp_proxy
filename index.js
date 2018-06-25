const express = require('express')
const path = require('path')
var request = require('request');
require('dotenv').load();
const PORT = process.env.PORT || 5000

 
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
express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get ('/yelp', (req, res) => res.json(info))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
