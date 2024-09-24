const mongoose =require("mongoose");

const orderSchema =mongoose.Schema({
    customerId: { type: String },
    customerName: { type: String },
    carName: { type: String },
    carNumber: { type: String },
    custAddress: { type: String },
    serviceName: { type: String },
    servicePrice: { type: String },
    mechanicId: { type: String },
    requestedOn: { type: String },
    delliveredOn: { type: String },
    status: {
        type: String,
        default: "PLACED",
    },
});

module.exports = mongoose.model("order", orderSchema);