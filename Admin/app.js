const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const dbConfig = require("./config/dbConfig");
const authRoutes = require("./services/authServices.js");
const carRoutes = require("./services/carServices");
const serviceRoutes = require("./services/car-washServices");
const orderRoutes = require("./services/orderServices.js");
const mechanicRoutes = require("./services/mechanicServices");
const productRoutes = require("./services/car-products.js");

var corsOptions = {
    origin: "http://localhost:3000",  // Fix the URL (http:// instead of http//)
};

app.use(cors(corsOptions));

// MongoDB connection
mongoose
   .connect(
      `mongodb+srv://abdullamohamed406:mohamed003@cluster0.cpqs8qc.mongodb.net/<databaseName>?retryWrites=true&w=majority`,
      { serverSelectionTimeoutMS: 5000 }
   )
   .then(() => console.log("Connected to MongoDb Database"))
   .catch((err) => {
      console.log("Database connection error: " + err);
   });

// Use Express's built-in body parsing middleware
app.use(express.urlencoded({ extended: false }));  // Fix the typo (extended instead of extented)
app.use(express.json());

// For preventing CORS ERRORS (Postman is just a testing tool)
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

// Every request from admin route goes through this URL: /admin
app.use("/admin/auth", authRoutes);
app.use("/admin/car-func", carRoutes);
app.use("/admin/car-services", serviceRoutes);
app.use("/admin/order", orderRoutes);
app.use("/admin/mechanic", mechanicRoutes);
app.use("/admin/car-product", productRoutes);

// Server-side error handling
app.use((req, res, next) => {
    const error = new Error("Not found");
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
