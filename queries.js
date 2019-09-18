/* Add all the required libraries*/

/* Connect to your database using mongoose - remember to keep your key secret*/

/* Fill out these functions using Mongoose queries*/
var fs = require('fs'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Listing = require('./ListingSchema.js'),
    config = require('./config');

// fix all deprecation warnings
mongoose.connect(config.db.uri, { 
	useNewUrlParser: true, 
	useUnifiedTopology: true,
        useFindAndModify: false,
	useCreateIndex: true
});

// Find lib west
var findLibraryWest = function() {
    Listing.findOne({ name: 'Library West' }, function (err, data) {console.log(data)});
};

// Remove CABL listings
var removeCable = function() {
    Listing.findOneAndDelete({ code: 'CABL' }, function (err, data) {console.log(data)});
};

// Update Phelps Lab address
var updatePhelpsLab = function() {
    var query = { name: 'Phelps Laboratory' };
    Listing.findOneAndUpdate(query, { address: '1953 Museum Rd, Gainesville, FL 32603' }, function (err, data) {console.log(data)});
};

// Retrieve all listings, unspecified
var retrieveAllListings = function() {
    Listing.find(function (err, data) {console.log(data)});
};

findLibraryWest();
removeCable();
updatePhelpsLab();
retrieveAllListings();
