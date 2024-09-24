const mongoose = require("mongoose");

const carSchema = mongoose.Schema({
    name: {
        type: String,
        requied: true,
        unique: true,
    },
    brand: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("car", carSchema);