const moogoose = require("mongoose");

try {
    moogoose.connect(process.env.URI_MONGODB);
    console.log("connected db successfull");
} catch (error) {
    console.log("connect db failed", error);
}

module.exports = moogoose;
