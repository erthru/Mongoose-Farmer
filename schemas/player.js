const mongoose = require("mongoose");

const schema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        level: {
            type: Number,
            default: 0,
        },
        role: {
            type: String,
            required: true,
        },
        teamId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

schema.virtual("team", {
    ref: "team",
    localField: "teamId",
    foreignField: "_id",
    justOne: true,
});

schema.set("toJSON", {
    transform: (doc, ret, options) => {
        delete ret._id;
        delete ret.teamId;
        return ret;
    },

    virtuals: true,
});

module.exports = mongoose.model("player", schema);
