const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const postSchema = new Schema({
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