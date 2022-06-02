const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    caption: {
        type: String
    },
    image: {
        type: String
    },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    username: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Post", postSchema);