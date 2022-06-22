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
    likes: {
        type: [String],
        default: [],
    },
    createAt: {
        type: Date,
        default: new Date()
    },
});

export default mongoose.model("Post", postSchema);