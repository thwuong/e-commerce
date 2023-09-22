const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const Auth = require("./auth.model");
const { generateToken, generateRefreshToken } = require("../middlewares/passport");
const hashPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(Number(process.env.SALT)));
};
const comparePassword = (password, hashPassword) => {
    return bcrypt.compareSync(password, hashPassword);
};

const register = async (req, res, next) => {
    const results = validationResult(req);
    console.log(results);
    // valid
    if (!results.isEmpty()) {
        return res.status(400).json({
            msg: "erros",
            error: results.array(),
        });
    }
    const { firstName, lastName, email, password } = req.body;
    // hash password

    try {
        const userExisted = await Auth.findOne({ email });
        if (userExisted) {
            return res.status(400).json({
                msg: "user does exist",
                error: {},
            });
        }
        const hash = hashPassword(password);
        // create new user
        const newUser = new Auth({
            firstName,
            lastName,
            email,
            hashPassword: hash,
        });
        await newUser.save();

        const token = generateToken({ email, roles: newUser.roles });
        const refreshToken = generateRefreshToken({ email, roles: newUser.roles });

        res.cookie("jwt", refreshToken, {
            maxAge: 60 * 60 * 24 * 3,
        });
        // send mail comfirm
        // send
        res.status(200).json({
            msg: "Register successfull",
            error: {},
            data: {
                token,
            },
        });
    } catch (error) {
        next(error);
    }
};
const login = (req, res, next) => {
    res.status(200).json({
        msg: "login successfull",
        error: {},
    });
};

const getProfile = (req, res, next) => {
    res.status(200).json({
        msg: "login successfull",
    });
};
const refreshToken = (req, res, next) => {
    res.status(200).json({
        msg: "login successfull",
    });
};
module.exports = {
    login,
    register,
    getProfile,
    refreshToken,
};
