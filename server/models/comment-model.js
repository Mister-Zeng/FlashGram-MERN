const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    content: {
        type: String,
        required: true,
    },
    username: {
        type: String
    }
});

module.exports = mongoose.model("Comment", commentSchema);