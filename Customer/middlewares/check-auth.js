const jwt = require("jsonwebtoken");
const authConfig = require("../config/authConfig");
const User = require("../model/customerModel");

//module.exports: remove verifyToken
verifyToken = (req,res, next) => {
    try {
        //const token = req.headers.authrization.split(" ")[1];
        const token = req.headers["x-access-token"];
        //console.log(token);
        if (!token) {
            return res.status(403).send({ message: "No token providesd!" });
        }
        const decoded =jwt.verify(token, authConfig.secretkey);
        //req.userData = decoded;
        req.useId = decoded.userId;
        // console.log(decoded.userId);
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Authentication Failed",
        });
    }
};

isCustomer = (req, res, next) => {
    User.findById(req.userId)
    .exec()
    .then((user) => {
        if (user.role === "CUSTOMER") {
            next();
            return;
        }
        res.status(403).json({
            message: "Not Athorized",
        });
    })
    .catch((err) => {
        console.log("Authorization Error: " + err);
        res.status(500).json({
            error: err,
        });
    });
};

const checkAuth = {
    verifyToken,
    isCustomer,
};

module.exports = checkAuth;