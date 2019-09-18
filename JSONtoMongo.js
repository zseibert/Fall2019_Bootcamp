'use strict';
/*
  Import modules/files you may need to correctly run the script.
  Make sure to save your DB's uri in the config file, then import it with a require statement!
 */
var fs = require('fs'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Listing = require('./ListingSchema.js'),
    config = require('./config');

// Remove all deprecation warnings
mongoose.connect(config.db.uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
});

/*
  Instantiate a mongoose model for each listing object in the JSON file,
  and then save it to your Mongo database
 */
// Read in listings.json file
fs.readFile('listings.json', 'utf8', function(err, data) {
    if (err) throw err;

    // Create storing variable
    var listings = JSON.parse(data);
    
    // Creates array of all listing data
    listings.entries.forEach(function(listing) {
	console.log(listing);
	new Listing(listing).save();
    });
});
