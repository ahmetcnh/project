const { response } = require("express")

class Response{
    constructor(data = null, massage= null){
        this.data = data
        this.massage = massage
    }

    succes(res){
        return res.status(200).json[{
            sucess: true,
            data: this.data,
            massage: this.massage ?? "işlem başarili"
        }]
    }
    
    created(res){
        return res.status(201).json({
            sucess: true,
            data: this.data,
            massage: this.massage ?? "işlem başarili"
        })
    }

    error500(res){
        return res.status(500).json({
            succes: false,
            data: this.data,
            massage: this.massage ?? "İşlem başarisiz"
        })
    }

    error400(res){
        return res.status(400).json({
            succes: false,
            data: this.data,
            massage: this.massage ?? "İşlem başarisiz"
        })
    }

    error401(res){
        return res.status(401).json({
            succes: false,
            data: this.data,
            massage: this.massage ?? "lütfen oturun açin"
        })
    }

    error404(res){
        return res.status(404).json({
            succes: false,
            data: this.data,
            massage: this.massage ?? "İşlem başarisiz"
        })
    }

    error429(res){
        return res.status(429).json({
            succes: false,
            data: this.data,
            massage: this.massage ?? "ddos"
        })
    }

}


module.exports = Response