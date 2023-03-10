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
        tests: [{
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Sample',
        }],

    },
    {
        timestamps: true,
    }
);