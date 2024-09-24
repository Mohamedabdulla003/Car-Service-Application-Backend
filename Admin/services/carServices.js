const express = require("express");
const router = express.Router();
const checkAuth = require("../middlewares/check-auth");
const CarController = require("../controllers/carController");

//Add Car
router.post(
    "/addcar",
    [checkAuth.verifyToken, checkAuth.isAdmin],
    CarController.addcar
    
);

router.get("/findAll", CarController.findAllCars);

//Find All Brands
router.get("/findAllBrands",CarController.findAllBrands);

//Find All Cars Specific Brand
router.post("/findByBrand",CarController.findByBrand);

//find Car By It's Name
router.get("/findByCar/:carId", CarController.findByCarId);

//Update Car Details
router.patch(
    "/updateCar/:id",
    [checkAuth.verifyToken,checkAuth.isAdmin],
    CarController.updateCar
);

router.delete(
    "/deleteCar/:carId",
    [checkAuth.verifyToken, checkAuth.isAdmin],
    CarController.deleteCar
);

module.exports = router;