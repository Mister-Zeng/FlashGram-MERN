import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unqie: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    posts: [{ type: mongoose.Types.ObjectId, ref: "Post", required: true }]
});

export default mongoose.model('User', userSchema);