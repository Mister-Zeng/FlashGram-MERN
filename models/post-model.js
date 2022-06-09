import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    caption: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    selectedFile: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        default: new Date()
    },
    likeCount: {
        type: Number,
        default: 0,
    },
});

export default mongoose.model("Post", postSchema);