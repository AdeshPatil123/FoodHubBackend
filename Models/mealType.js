const mongoose = require('mongoose');

const mealtypeSchema = new mongoose.Schema({

    name : String,
    mealtype_id : Number,
    content : String,
    image : String,

});

module.exports = mongoose.model("mealtypes", mealtypeSchema, "mealtypes");