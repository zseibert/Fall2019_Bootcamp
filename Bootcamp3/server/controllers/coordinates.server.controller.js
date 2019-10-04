var config = require('../config/config'), 
    request = require('request');

module.exports = function(req, res, next) {
  if(req.body.address) {
      //This code just formats the address so that it doesn't have space and commas using escape characters
      var addressTemp = req.body.address;
      var addressTemp2 = addressTemp.toLowerCase();
      var addressTemp3 = addressTemp2.replace(/\s/g, "%20");
      var addressTemp4 = addressTemp3.replace(/,/g , "%2C");
      
    //Setup your options q and key are provided. Feel free to add others to make the JSON response less verbose and easier to read 
    var options = { 
      q: addressTemp4,
      key: config.openCage.key,  
    }

    //Setup your request using URL and options - see ? for format
    request({
      url: 'https://api.opencagedata.com/geocode/v1/json', 
      qs: options
      }, function(error, response, body) {
        if(error) {
          //res.status(400).send(err);
          console.log('error', response.statusMessage);
          //console.log('error', error.message); 
        }
        if(response.statuseCode == 200) {
          var info = JSON.parse(body).results[0];
          req.results = info.geometry;
        }
        next();
    });
  } else {
    next();
  }
};
