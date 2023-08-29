const restaurantData  = require('../Models/restaurant');
// const restaurantData = require("../Models/data.json");
const _ = require("underscore");


exports.getAllRestaurants = async (req, res) => {
    try{
        let RestaurantData =await restaurantData.find();
        res.status(200).json({
            message : "All restaurants fetched successfully",
            restaurants : RestaurantData
        });
    }
    catch(err){
        res.status(500).send(err);
    }
};

exports.getAllRestaurantsByLocation =async (req, res) => {
    try{
        let RestaurantData = await restaurantData.find();
        let filteredData = _.where(RestaurantData, {city: req.params.cityName});
        res.status(200).json({
            message : `Restaurants in ${req.params.cityName} city fetched successfully`,
            restaurants : filteredData
        });
    }
    catch(err){
        res.status(500).send(err);
    }
};

exports.getAllRestaurantsById =async (req, res) => {
    try{
        let RestaurantData = await restaurantData.findById(req.params.id);
        let filteredData =RestaurantData;
        
        res.status(200).json({
            message : `Restaurants in ${req.params.id} city fetched successfully`,
            restaurants : filteredData
        });
    }
    catch(err){
        res.status(500).send(err);
    }
};


exports.getAllRestaurantsByLocationID =async (req, res) => {
    try{
        let RestaurantData = await restaurantData.find();
        let filteredData = _.where(RestaurantData, {location_id:parseInt(req.params.locationID)});
        res.status(200).json({
            message : `Restaurants in ${req.params.locationID} city fetched successfully`,
            restaurants : filteredData
        });
    }
    catch(err){
        res.status(500).send(err);
    }
};

exports.getRestaurantsByFilters =async (req, res) => {
    try {
        let RestaurantData = await restaurantData.find();
        let {mealType, location, cuisine, lowCost, highCost, sort, page} = req.query;
  
        let filteredData = RestaurantData;
  
        // Filter by meal type
        if (mealType) {
            filteredData = filteredData.filter((restaurant) => restaurant.mealtype_id.some((c)=> c.id === parseInt(mealType)));
        }

        // if (mealType) {
        //     filteredData = filteredData.filter((restaurant) => restaurant.mealtype_id.some((c)=> c.id === parseInt(mealType)));
        // }
  
        // Filter by location
        if (location) {
            filteredData = filteredData.filter((restaurant) => restaurant.location_id === parseInt(location));
        }
  
        // Filter by cuisine
        if (cuisine) {
            filteredData = filteredData.filter((restaurant) => restaurant.cuisine.some((c) => c.id === parseInt(cuisine)));
        }
  
        // Filter by cost range
        if (lowCost && highCost) {
            filteredData = filteredData.filter((restaurant) => restaurant.min_price >= parseInt(lowCost) && restaurant.min_price <= parseInt(highCost));
        }
  
        // Sort by rating
        if (sort === "asc") {
            filteredData.sort((a, b) => a.min_price - b.min_price);
        }
        if (sort === "desc") {
            filteredData.sort((a, b) => b.min_price - a.min_price);
        }

        // if (sort === 1) {
        //     filteredData.sort((a, b) => a.min_price - b.min_price);
        // }
        // if (sort === -1) {
        //     filteredData.sort((a, b) => b.min_price - a.min_price);
        // }
  
        // Pagination
        const pageSize = 2; // Number of restaurants per page
        const startIndex = (page - 1) * pageSize;
        const endIndex = page * pageSize;
        const paginatedData = filteredData.slice(startIndex, endIndex);
        const count = filteredData.length
  
        res.status(200).json({
            message: "Restaurants fetched successfully with filters",
            count:count,
            restaurants: paginatedData,
        });
    } 
    catch (err) {
        res.status(500).send(err);
    }
};


exports.getByAllFilters =async (req, res) => {
    try {
        
        console.log(req.body);
        const {mealType, location, cuisine, lowCost, highCost, sort, page} = req.body;
        // if (!mealType && !location && !cuisine && !lowCost && !highCost && !sort && !page) {
        //     return res.status(400).json({ message: "At least one query parameter is required." });
        // }
        let RestaurantData = await restaurantData.find();
        let filteredData = RestaurantData;
  
        // Filter by meal type
        if (mealType) {
            filteredData = filteredData.filter((restaurant) => restaurant.mealtype_id.some((c)=> c.id === parseInt(mealType)));
        }
  
        // Filter by location
        if (location) {
            filteredData = filteredData.filter((restaurant) => restaurant.location_id === parseInt(location));
        }
  
        // Filter by cuisine
        // if (cuisine) {
        //     filteredData = filteredData.filter((restaurant) => restaurant.cuisine.some((c) => c.id === parseInt(cuisine)));
        // }
  
        if (cuisine) {
            // Convert cuisine array elements to integers if they are in string format
            const cuisineIds = cuisine.map(c => parseInt(c));
        
            filteredData = filteredData.filter((restaurant) => {
                // Check if any of the restaurant's cuisines match any cuisine ID in the provided array
                return restaurant.cuisine.some(c => cuisineIds.includes(c.id));
            });
        }
        // Filter by cost range
        if (lowCost && highCost) {
            filteredData = filteredData.filter((restaurant) => restaurant.min_price >= parseInt(lowCost) && restaurant.min_price <= parseInt(highCost));
        }
  
        // Sort by rating
        if (sort === 1) {
            filteredData.sort((a, b) => a.min_price - b.min_price);
        }
        if (sort === -1) {
            filteredData.sort((a, b) => b.min_price - a.min_price);
        }
  
        // Pagination
        const pageSize = 2; // Number of restaurants per page
        const startIndex = (page - 1) * pageSize;
        const endIndex = page * pageSize;
        const paginatedData = filteredData.slice(startIndex, endIndex);
        const count = filteredData.length;
        // const pageCount = Math.ceil(count/pageSize);
        let arr = [];
        for(let i=1; i<= Math.ceil(filteredData.length/pageSize);i++){
            arr.push(i);
        }
        res.status(200).json({
            message: "Restaurants fetched successfully with filters",
            count:count,
            pageCount:arr,
            pageSize:2,
            startIndex:startIndex,
            endIndex:endIndex,
            restaurants:paginatedData,
           
        });
    } 
    catch (err) {
        res.status(500).send(err);
    }
};