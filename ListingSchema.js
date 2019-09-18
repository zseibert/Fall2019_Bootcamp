/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var listingSchema = new Schema({
    code: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    coordinates: {
        latitude: Number,
        longitude: Number
    },
    address: String,
    created_at: Date,
    updated_at: Date
});

// Create a 'pre' function
listingSchema.pre('save', function(next) {
var curr = new Date();

  this.update_at = curr;
  if(!this.created_at)
    this.created_at = curr;

next();

});

/* Use your schema to instantiate a Mongoose model */
var Listing = mongoose.model('Listing', listingSchema);

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = Listing;
