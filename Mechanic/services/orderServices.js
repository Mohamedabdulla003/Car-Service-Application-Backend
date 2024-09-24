const express = require("express");
const router =express.Router();
const checkAuth =require("../middlewares/check-auth");
const OrderController =require("../controllers/orderController");

router.patch(
    "/updateOrder/:orderId",
    [checkAuth.verifyToken,checkAuth.isMecahnic],
    OrderController.updateOrder
);

router.get(
    "/findInProcessOrders/:mechId",
    [checkAuth.verifyToken, checkAuth.isMecahnic],
    OrderController.findProcessOrders
);

router.get(
    "/findMyOrders/:mechId",
    [checkAuth.verifyToken, checkAuth.isMecahnic],
    OrderController.findmyorders
);

module.exports = router;