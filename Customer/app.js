const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const cors =require("cors");
const dbConfig =require("./config/dbConfig");
const authRoutes = require("./services/authServices");
const accountRoutes =require("./services/accountServices");
const orderRoutes =require("./services/orderServices");
const bodyParser = require("body-parser");

/*
Via Express routes,HTTP request that matches a route will be checked by
CORS Middleware before coming to Security layer
*/

var corsOptions = {
    origin: "http://localhost:3000",
};
app.use(cors(corsOptions));

//Database Connection
mongoose
  .connect(
    `mongodb+srv://abdullamohamed406:mohamed003@cluster0.cpqs8qc.mongodb.net/`

)
.catch((err) => {
    console.log("Database Connection Error: " + err);
});
let db = mongoose.connection;

//To check Database Connection is open or not
db.once("open", function () {
    console.log("Connected to MongoDb Database");
});

app.use(bodyParser.urlencoded({ extended: false }));

//parse requests of content-type -application/json
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Acess-Control-Allow-Origin",
        "Origin, X-Requested-width,Content-Type,Accept,Authorization" 
    );
    if (req,method === "OPTIONS") {
        res.header("Access-Control-Allow-methods","PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

//Every request from customer route goes though this url : / customer
app.use("/customer/auth", authRoutes);
app.use("/customer/account",accountRoutes);
app.use("/customer/order", orderRoutes);

//Server Side Error Handling
app.use((req, res, next) => {
    const error = new Error("not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,
        },
    });
});

module.exports = app;
