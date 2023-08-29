const mongoose = require('mongoose');

const MenuSchema = new mongoose.Schema({
    restaurant_id:Number,
    menuCard:Array
})

const Menu = mongoose.model('Menu',MenuSchema);

module.exports = Menu;