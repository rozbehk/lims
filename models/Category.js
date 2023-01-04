const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        tests: [{
            type: Schema.Types.ObjectId,
            ref: 'Test'
        }],
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

module.exports = mongoose.model("Category", userSchema);
