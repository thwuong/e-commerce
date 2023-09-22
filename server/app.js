const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const createRoute = require("./api/v1/routes/index");
const app = express();

// init db
require("./api/v1/databases/init.mongodb");
// middlewares
app.use(cors());
app.use(helmet());
app.use(morgan("combined"));
// body parser
app.use(cookieParser());
app.use(express.json());

//router
createRoute(app);
//handle errors

app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        msg: err.message || "Internal server error",
        status: err.status || 500,
    });
});

module.exports = app;
