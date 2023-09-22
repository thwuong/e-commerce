const { check, oneOf, body } = require("express-validator");
const validateRegister = () => {
    return [
        body("firstName", "first name is not empty").trim().notEmpty(),
        body("lastName", "last name is not empty").trim().notEmpty(),
        body("email", "email is required").trim().notEmpty().isEmail(),
        body("password", "password is required").trim().notEmpty(),
    ];
};

module.exports = {
    validateRegister,
};
