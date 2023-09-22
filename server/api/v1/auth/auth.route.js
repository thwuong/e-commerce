const express = require("express");
const router = express.Router();
const { login, getProfile, refreshToken, register } = require("./auth.controller");
const { validateRegister } = require("./auth.validation");
router.post("/register", validateRegister(), register);
router.post("/login", login);
router.get("/refresh_token", refreshToken);
router.get("/profile", getProfile);

module.exports = router;
