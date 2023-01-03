const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            trim: true,
            lowercase: true,
            required: true,
        },
        password: {
            type: String,
            trim: true,
            minLength: 3,
            required: true,
        },
        receptionist: {
            type: Boolean,
            require: true
        },
        labTech:{
            type: Boolean,
            require: true
        },
        labMan:{
            type: Boolean,
            require: true
        },
        admin: {
            type: Boolean,
            require: true
        },
        profileImage : {
            type: String
        }
    },
    {
        timestamps: true,
        toJSON: {
            transform: function (doc, ret) {
                delete ret.password;
                return ret;
            },
        },
    }
);

module.exports = mongoose.model("User", userSchema);
