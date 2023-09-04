const joi = require("joi")
const APIError = require("../../utils/errors")


class authValidation {
    constructor() {}

    static register = async (req, res, next) => {
        try {
            const schema = joi.object({
                name: joi.string().trim().min(1).max(30).required().messages({
                    "string.base": "isim alani metin olmali",
                    "string.empty": "isim alani bos olamaz",
                    "string.min": "isim en az 3 karakter",
                    "string.max": "isim en fazla 30 karakter",
                    "string.required": "isim alani zorunlu",
                }),

                lastname: joi.string().trim().min(1).max(30).required().messages({
                    "string.base": "soyad metin olmali",
                    "string.empty": "soyadbos olamaz",
                    "string.min": "soyad en az 3 karakter",
                    "string.max": "soyad en fazla 30 karakter",
                    "string.required": "soyad zorunludur",
                }),

                email: joi.string().email().trim().min(3).max(100).required().messages({
                    "string.base": "email metin olmalidir",
                    "string.empty": "email bos olamaz",
                    "string.min": "email en az 3 karakter",
                    "string.email": "geçerli bir email girin",
                    "string.max": "email en fazla 100 karakter",
                    "string.required": "email zorunludur",
                }),

                password: joi.string().trim().min(6).max(36).required().messages({
                    "string.base": "şifre metin olmalidir",
                    "string.empty": "şifre bos olamaz",
                    "string.min": "şifre en az 6 karakter",
                    "string.max": "şifre en fazla 36 karakter",
                    "string.required": "şifre zorunludur",
                })
            });

            await schema.validateAsync(req.body, { abortEarly: false });
        } catch (error) {
            const errorMessages = error.details.map(detail => detail.message);
            throw new APIError(errorMessages.join(", "));
        }
        next();
    };


    static login = async (req, res, next) => {
        try {
            await joi.object({
                email: joi.string().email().trim().min(3).max(100).required().messages({
                    "string.base": "email metin olmalıdır",
                    "string.empty": "email boş bırakılamaz",
                    "string.email": "geçerli bir email olmalıdır",
                    "string.min": "minimum 3 karakter olmalıdır",
                    "string.max": "max 100 karakter olmalıdır",
                    "string.required": "email zorunludur"
                }),
                password: joi.string().trim().min(6).max(36).required().messages({
                    "string.base": "şifre metin olmalıdır",
                    "string.empty": "şifre boş bırakılamaz",
                    "string.min": "minimum 6 karakter olmalıdır",
                    "string.max": "max 36 karakter olmalıdır",
                    "string.required": "şifre zorunludur"
                })
            }).validateAsync(req.body);

        } catch (error) {
            const errorMessages = error.details.map(detail => detail.message);
            throw new APIError(errorMessages.join(", "));
        }
        next();
    }
}

module.exports = authValidation;




