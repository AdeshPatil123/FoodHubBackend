const LocationData = require("../Models/locations");

exports.getAllLocations = async (req, res) => {
    let locationData = await LocationData.find();                                   //added after replacing JSON data with MongoDB
    try{
        res.status(200).json({
            message : "All locations fetched successfully",
            locations : locationData
        });
    }
    catch(err){
        res.status(500).send(err);
    }
};