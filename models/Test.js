const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const testSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        category: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Category',
        },
        samples: {
            type: Schema.Types.ObjectId,
            ref: 'Sample',
        },
        customer: {
            type: Schema.Types.ObjectId,
            ref: 'Customer',
        },

    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Test", testSchema);
