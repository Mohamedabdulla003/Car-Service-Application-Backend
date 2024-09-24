const express = require("express");
const router = express.Router();
const checkAuth = require("../middlewares/check-auth");
const OrderCotroller =require("../controllers/orderController");

router.get(
    "/findOrders/:customerId",
    [checkAuth.verifyToken, checkAuth.isCustomer],
    OrderCotroller.findMyOrders
);

module.exports = router;