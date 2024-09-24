const http =require("http");
const app =require("./app");
//const eurekaHelper = require("./eureka-helper");
require("dotenv").config();


const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port, () => {
    console.log("Server is Listening on Admin MS Port: " + port);
});

//eurekahelper.registerWithEureka("Admin-MicoService",port);