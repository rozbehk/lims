const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const categorySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        tests: [{
            type: Schema.Types.ObjectId,
            ref: 'Test'
          }]
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Category", categorySchema);
