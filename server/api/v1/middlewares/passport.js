const jwt = require("jsonwebtoken");

const generateToken = (user) => {
    return jwt.sign(user, process.env.JWT_SECRET_TOKEN, {
        expiresIn: "10m",
    });
};
const generateRefreshToken = (user) => {
    return jwt.sign(user, process.env.JWT_SECRET_REFRESH_TOKEN, {
        expiresIn: "3d",
    });
};
const validToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            msg: "Token not found",
            success: false,
        });
    }

    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
};

module.exports = {
    generateToken,
    generateRefreshToken,
    validToken,
};
