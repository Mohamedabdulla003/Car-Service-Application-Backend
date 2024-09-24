const express = require("express");
const app = express();
const bodyParser =require("body-parser");
const mongoose =require("mongoose");
const cors =require("cors");
const dbConfig = require("./config/dbConfig");
const accountRoutes =require("./services/accountServices");
const orderRoutes =require("./services/orderservices");

var corsOptions = {
    origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

mongoose.connect(
    `mongodb+srv://abdullamohamed406:mohamed003@cluster0.cpqs8qc.mongodb.net/<databaseName>?retryWrites=true&w=majority`,
    { serverSelectionTimeoutMS: 5000 }
)

.catch((err) => {
    console.log("Database connection Error: " + err);
});
let db =mongoose.connection; 

//To check Database Connection
db.once("open",function () {
    console.log("Connected to MongoDb Database");
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//For preventing CORS ERRORS (Pstman is just a testing tool)
app.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-With,Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-method","PUT,POST,PATCH,DELETE,GET");
        return res.status(200).json({});
    }
    next();
});

//Every request from admin route goes through this url : /admin
app.use("/mechanic/account", accountRoutes);
app.use("/mechanic/orders",orderRoutes);

//Server Side Error Handling
app.use((req,res,next) => {
    const error = new Error("NOt found");
    error.status = 404;
    next(error);
});

app.use((error,req,res,next) => {
    res.status(error.status || 500);
    res.json({
        error: {
          message:error.message,
        },
    });
});

module.exports = app;