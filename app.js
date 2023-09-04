require("express-async-errors")
const express = require("express");
const app = express();
require("dotenv").config();
require("./src/db/dbConnection");
const port = process.env.PORT || 5001
const router = require("./src/routers")
const errorHandlerMiddleware = require("./src/middlewares/errorHandler")
const mongoSantize = require("express-mongo-sanitize")
const path = require("path"); 
const apiLimiter = require("./src/middlewares/rateLimit");

//Middlewares
app.use(express.json())
app.use(express.json({limit: "50mb"}))
app.use(express.urlencoded({limit: "50mb",extended: true, parameterLimit:50000}))


app.use("/api",apiLimiter)

app.use(
        mongoSantize({
            replaceWith: `_`
        }),
);

app.use("/api", router)

app.get("/",(req,res)=>{
    res.json({
        massage: "Selamlar",
    }) 
})

app.use(errorHandlerMiddleware);

app.listen(port, ()=>{
    console.log(`Server ${port} portundan çalisiyor`);
})







