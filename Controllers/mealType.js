const MealtypesData = require("../Models/mealType")


exports.getAllMealTypes = async (req, res) => {
    let mealtypesData = await MealtypesData.find();                                   //added after replacing JSON data with MongoDB
    try{
        res.status(200).json({
            message : "All mealtypes fetched successfully",
            mealtypes : mealtypesData
        });
    }
    catch(err){
        res.status(500).send(err);
    }
};