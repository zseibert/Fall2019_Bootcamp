/* Dependencies */
var mongoose = require('mongoose'), 
    Listing = require('../models/listings.server.model.js'),
    coordinates = require('./coordinates.server.controller.js');
    
/*
  In this file, you should use Mongoose queries in order to retrieve/add/remove/update listings.
  On an error you should send a 404 status code, as well as the error message. 
  On success (aka no error), you should send the listing(s) as JSON in the response.
  */

/* Create a listing */
exports.create = function(req, res) {

  /* Instantiate a Listing */
  var listing = new Listing(req.body);

  /* save the coordinates (located in req.results if there is an address property) */
  if(req.results) {
    listing.coordinates = {
      latitude: req.results.lat, 
      longitude: req.results.lng
    };
  }
 
  /* Then save the listing */
  listing.save(function(err) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(listing);
      console.log(listing)
    }
  });
};

/* Show the current listing */
exports.read = function(req, res) {
  /* send back the listing as json from the request */
  res.json(req.listing);
};

/* Update a listing - note the order in which this function is called by the router*/
exports.update = function(req, res) {
  var listing = req.listing;

  /* Replace the listings's properties with the new properties found in req.body */
  listing.code = req.body.code;
  listing.name = req.body.name;
  listing.address = req.body.address;

  /*save the coordinates (located in req.results if there is an address property) */
  if(req.results && req.body.address) {
    listing.coordinates = {
      latitude: req.results.lat,
      longitdue: req.results.lng
    };
  }

  /* Save the listing */
  listing.save(function(err) {
    if(err) {
      //console.log(err);
      res.status(400).send(err);
    } else {
      res.json(listing);
      //console.log(listing);
    }
  })
};

/* Delete a listing */
exports.delete = function(req, res) {
  var listing = req.listing;

  /* Add your code to remove the listins */
  listing.remove(function(err) {
    if(err) {
      //console.log(err);
      res.status(400).send(err);
    } else {
      //res.json(listing);
      res.end();
    }
  });
};

/* Retreive all the directory listings, sorted alphabetically by listing code */
exports.list = function(req, res) {
  /* Add your code */
  Listing.find({}).sort({code: 1}).exec(function(err, listing) {
    if(err) {
      res.status(400).send(err);
    } else {
      res.json(listing);
    }
  });
};

/* 
  Middleware: find a listing by its ID, then pass it to the next request handler. 

  HINT: Find the listing using a mongoose query, 
        bind it to the request object as the property 'listing', 
        then finally call next
 */
exports.listingByID = function(req, res, next, id) {
  Listing.findById(id).exec(function(err, listing) {
    if(err) {
      res.status(400).send(err);
    } else {
      req.listing = listing;
      next();
    }
  });
};