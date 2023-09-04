const router = require('express').Router()
const auth = require("./auth.routes")

 const multer = require("multer")
 const APIError = require("../utils/errors")
 const Response = require("../utils/response")


 router.use(auth)



module.exports = router