const moogoose = require("mongoose");
const { Schema } = moogoose;

const authSchema = new Schema(
    {
        firstName: {
            type: String,
        },
        lastName: {
            type: String,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        validEmail: {
            type: Boolean,
            default: false,
        },
        gender: {
            type: String,
        },
        numberPhone: {
            type: String,
            validate: {
                validator: function (v) {
                    return /\d{3}-\d{3}-\d{4}/.test(v);
                },
                message: (props) => `${props.value} is not a valid phone number!`,
            },
        },
        hashPassword: {
            type: String,
        },
        numberCard: {
            type: String,
        },
        validCard: {
            type: Boolean,
            default: false,
        },
        address: {
            country: {
                type: String,
            },
            street1: {
                type: String,
            },
            street2: {
                type: String,
            },
            city: {
                type: String,
            },
            state: {
                type: String,
            },
            zip: {
                type: String,
            },
        },
        roles: {
            type: Array,
            default: ["USER"],
            // ["USER","ADMIN","..."]
        },
    },
    {
        timestamps: true,
    }
);

module.exports = moogoose.model("Auth", authSchema);
