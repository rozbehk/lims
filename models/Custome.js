const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const categorySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        username:{
            type: Schema.Types.ObjectId,
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
