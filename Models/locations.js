const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({

    name : String,
    location_id : Number,
    city : String,
    city_id : Number,
    country : String,

});

module.exports = mongoose.model("locations", locationSchema, "locations");