const user = require("../models/user.model")
const bcrypt = require("bcrypt");
const APIError = require("../utils/errors");
const Response = require("../utils/response");
const { createToken } = require("../middlewares/auth");
const {response} = require("express");
const crypto = require("crypto");
const { reset } = require("nodemon");
const moment = require("moment/moment");


const login = async (req,res)=>{
    const { email , password } = req.body
    const userInfo = await user.findOne({email})
    console.log(userInfo);
    if(!userInfo)
        throw new APIError("email ya da şifre hatali",401)

    const comparePassword = await bcrypt.compare(password, userInfo.password)
    console.log(comparePassword);

    if(!comparePassword)
        throw new APIError("Email ya da şifre hatali",401)

        createToken(userInfo,res)
}

const register = async (req,res)=>{
    const {email} = req.body
    const userCheck = await user.findOne({email})
    if(userCheck){
        throw new APIError("Girmiş olduğunuz mail kullanimda", 401);
    }

    req.body.password =await bcrypt.hash(req.body.password, 10)

    console.log("hash şifre:",req.body.password);

        const userSave = new user(req.body)

        await userSave.save()
        .then((data) => {
                return new Response(data, "kayit eklendi").created(res)
        })
        .catch((err) => {
            throw new APIError("kullanici kayit edilemedi",400)
        });
}



module.exports = {
    login,
    register,
}

 