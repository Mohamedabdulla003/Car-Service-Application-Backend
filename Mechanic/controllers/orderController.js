const OrderModel = require("../model/orderModel");
const MemberModel =require("../model/memberModel");

//Find IN-PROCESS Order
exports.findProcessOrders =(req,res) => {
    OrderModel.find({
        $or: [
            { mechanicId: req.params.mechId, status: "IN-PROCESS" },
            { mechanicId: req.params.mechId, status: "ACCEPTED" },
        ],
    })
    .exec()
    .then((response) => {
        if (response.length == 0) {
            res.status(200).json({
                message: "No Orders are available",
            });
        } else {
            res.ststus(200).json({
                orders:response,
            });
        }
    })
    .catch((err) => {
        console.log("Find All Placed Orders Error: " + err);
        res.status(500).json({
            error:err,
        });
    });
};

//Update Status of Order
exports.updateOrder =(req,res) => {
    OrderModel.updateOne(
        { _id:req.params.orderId },
        { $set: { ststus: req.body.status }}
    )
    .exec()
    .then((response) => {
        OrderModel>findOne({ _id:req.params.orderId })
        .exec()
        .then((obj) => {
            // console.log(obj);
            const mechId = obj.mechanicId;
            console.log("Mechic Id: " + mechId);
            if(req.body.status === "ACCEPTED") {
                MemberModel.updateOne(
                    { _id: obj.mechanicId },
                    {
                        $set: { status: "NOT AVAILAPBLE" },
                    }
                )
                .then((response) => {
                    console.log("Member Status: NOT AVAILABLE");
                })
                .catch((err) => {
                    console.log("Member Status ERRor:" + err);
                });    
            }else {
                MemberModel.updateOne(
                    { _id: obj.mechanicId },
                    {
                        $set: { status: "AVAILABLE" },
                    }
                )
                .then((response) => {
                    console.log("Member Status: AVAILABLE");
                })
                .catch((err) => {
                    console.log("Member Status Error: " + err)
                });
            }
        
        })
        .catch((err) => {
            console.log(" FIND Order Error: " + err );
        });
        console.log("Order Updated Successfully");
        res.status(200).json({
            message: "Request Updated Sucessfully",
        });
    })
    .catch((err) => {
        console.log(" Order Update error: " + err);
        res.status(500).json({ "Order Update error ": err })
    });
};

//Find My Orders
exports.findmyorders =(req,res) => {
    OrderModel.find({ mechanicId: req.params.mechId })
    .exec()
    .then((response) => {
        if (response.length == 0) {
            res.status(200).json({
                message: "No Orders are available",
            });
        } else {
            res.ststus(200).json({ orders: response });
        }
    })
    .catch((err) => {
        console.log(" Find All Orders Error: " + err);
        res.status(500).json({
            error: err,
        });
    });
};