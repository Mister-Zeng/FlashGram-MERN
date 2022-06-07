import mongoose from 'mongoose';
import Post from '../models/post-model.js'
import User from '../models/user-model.js';

export const getAllPosts = async (req, res) => {
    let posts;
    try {
        posts = await Post.find()
    } catch (error) {
        console.log(error)
    }
    if (!posts) {
        res.status(404).json({ message: "No Posts Found" })
    }
    res.status(200).json({ posts })
}

export const addPost = async (req, res) => {
    const { user, selectedFile, caption } = req.body;

    let existingUser;
    try {
        existingUser = await User.findById(user)
    } catch (error) {
        console.log(error);
    }
    if (!existingUser) {
        res.status(400).json({ message: "Unable To Find User By This ID" })
    }
    const post = new Post({
        user,
        selectedFile,
        caption
    });

    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await post.save({ session });
        existingUser.posts.push(post)
        await existingUser.save({ session })
        await session.commitTransaction();
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error })
    }
    res.status(200).json({ post })
};

export const updatePost = async (req, res) => {
    const { caption } = req.body;
    const postId = req.params.id;
    let post;
    try {
        post = await Post.findByIdAndUpdate(postId, {
            caption
        });
    } catch (error) {
        console.log(error);
    }
    if (!post) {
        res.status(500).json({ message: "Unable To Update The Post" })
    }
    res.status(200).json({ post });
}

export const getById = async (req, res) => {
    const id = req.params.id;
    let post;
    try {
        post = await Post.findById(id);
    } catch (error) {
        console.log(error)
    }
    if (!post) {
        res.status(404).json({ message: "No Post Found" })
    }
    res.status(200).json({ post })
}

export const deletePost = async (req, res) => {
    const id = req.params.id;

    let post;
    try {
        post = await Post.findByIdAndRemove(id).populate('user');
        await post.user.posts.remove(post)
    } catch (error) {
        console.log(error);
    }
    if (!post) {
        res.status(500).json({ message: "Unable To Delete" })
    }
    res.status(200).json({ message: "Deleted Successfully" })
}

export const getUserById = async (req, res) => {
    const userId = req.params.id;

    let userPosts;
    try {
        userPosts = await User.findById(userId).populate("posts");
    } catch (error) {
        console.log(error)
    }
    if (!userPosts) {
        res.status(404).json({ message: "No Post Found" })
    }
    res.status(200).json({ posts: userPosts })
}