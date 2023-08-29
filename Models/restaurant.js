const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    _id:String,
    name:String,
    city:String,
    location_id:Number,
    city_id:Number,
    locality:String,
    thumb:Array,
    aggregate_rating:Number,
    rating_text:String,
    min_price:Number,
    contact_number:Number,
    cuisine:Array,
    image:String,
    mealtype_id:Array,
})

const Restaurant = mongoose.model('Restaurant',restaurantSchema);

module.exports = Restaurant;