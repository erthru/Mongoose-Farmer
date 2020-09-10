const mongoose = require("mongoose");

const schema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

schema.virtual("members", {
    ref: "player",
    localField: "_id",
    foreignField: "teamId",
});

schema.set("toJSON", {
    transform: (doc, ret, options) => {
        delete ret._id;
        return ret;
    },

    virtuals: true,
});

module.exports = mongoose.model("team", schema);
