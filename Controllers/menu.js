const MenuData = require("../Models/menu");
const _ = require("underscore");



exports.getAllMenuById =async (req, res) => {
    try{
        let MenuData1 = await MenuData.find();
        let filteredData = _.where(MenuData1, {restaurant_id:parseInt( req.params.restId)});
        res.status(200).json({
            message : `Menu in ${req.params.restId} city fetched successfully`,
            Menu : filteredData,
            mymenu:filteredData[0].menuCard
        });
    }
    catch(err){
        res.status(500).send(err);
    }
};