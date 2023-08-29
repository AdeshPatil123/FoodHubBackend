const express = require("express");
const router = express.Router();
const restaurantData = require("../Models/restaurant");

const restaurantController = require("../Controllers/restaurant").getAllRestaurants;
const restaurantByLocationController = require("../Controllers/restaurant").getAllRestaurantsByLocation;
const restaurantByFilterController = require("../Controllers/restaurant").getRestaurantsByFilters;
const restaurantByLocationID = require("../Controllers/restaurant").getAllRestaurantsByLocationID;
const restaurantById = require("../Controllers/restaurant").getAllRestaurantsById;
const restaurantFilter = require("../Controllers/restaurant").getByAllFilters;

//Payments
const paymentController = require('../Controllers/Payments');


const locationController = require("../Controllers/locations").getAllLocations;
const mealTypesController  = require("../Controllers/mealType").getAllMealTypes;

const loginController = require("../Controllers/user").login;
const signupController = require("../Controllers/user").signup;

const menuController = require("../Controllers/menu").getAllMenuById;

router.get('/getAllRestaurants', restaurantController);
router.get('/getRestaurantsByLocation/:cityName', restaurantByLocationController);
// router.post("/filter", restaurantByFilterController);
router.get("/getRestaurantByFilter", restaurantByFilterController);
router.post("/AllFilters",restaurantFilter);
router.get("/restaurant/:locationID",restaurantByLocationID);
// router.get("/getRestaurantById/:id",(req,res,next)=>{
//     console.log(req.params.id);
//     restaurantData.findById(req.params.id)
//     .then(response=>{
//         console.log(response)
//         res.status(200).json({
//             restaurant:response
//         })
//     })
//     .catch(err=>console.log(err))
// } );

router.get("/getRestaurantById/:id",restaurantById)


router.get("/getAllLocations",locationController);
router.get('/getAllMealTypes', mealTypesController);
router.get("/menu/:restId",menuController);



router.post('/login', loginController);
router.post('/signup', signupController);


router.post('/payment', paymentController.payments);
router.post('/paymentCallback', paymentController.paymentsCallback);

module.exports = router;