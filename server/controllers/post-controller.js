import mongoose from 'mongoose';
import Post from '../models/post-model.js'
import User from '../models/user-model.js';

export const getAllPosts = async (req, res) => {
    let posts;
    try {
        posts = await Post.find().populate('user')
    } catch (error) {
        console.log(error.message)
    }
    if (!posts) {
        return res.status(404).json({ message: "No Posts Found" })
    }
    res.status(200).json({ posts })
}

export const addPost = async (req, res) => {
    const { user, selectedFile, caption, username } = req.body;

    let existingUser;
    try {
        existingUser = await User.findById(user)
    } catch (error) {
        console.log(error);
    }
    if (!existingUser) {
        return res.status(400).json({ message: "Unable To Find User By This ID" })
    }
    const post = new Post({
        user,
        selectedFile,
        caption,
        username
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
        return res.status(500).json({ message: error })
    }
    res.status(200).json({ post })
};

export const updatePost = async (req, res) => {
    const { caption } = req.body;
    const { id } = req.params;
    let post;
    try {
        post = await Post.findByIdAndUpdate(id, {
            caption
        });
    } catch (error) {
        console.log(error);
    }
    if (!post) {
        return res.status(500).json({ message: "Unable To Update The Post" })
    }
    res.status(200).json({ post });
}

export const getById = async (req, res) => {
    const { id } = req.params;
    let post;
    try {
        post = await Post.findById(id);
    } catch (error) {
        console.log(error)
    }
    if (!post) {
        return res.status(404).json({ message: "No Post Found" })
    }
    res.status(200).json({ post })
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    let post;
    try {
        post = await Post.findByIdAndRemove(id).populate('user');
        await post.user.posts.remove(post)
    } catch (error) {
        console.log(error);
    }
    if (!post) {
        return res.status(500).json({ message: "Unable To Delete" })
    }
    res.status(200).json({ message: "Deleted Successfully" })
}

export const getUserById = async (req, res) => {
    const { id } = req.params;

    let userPosts;
    try {
        userPosts = await User.findById(id).populate("posts");
    } catch (error) {
        console.log(error)
    }
    if (!userPosts) {
        return res.status(404).json({ message: "No Post Found" })
    }
    res.status(200).json({ user: userPosts })
}

export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) {
        console.log(req.headers)
        return res.json({ message: "unauthenticated" })
    }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const post = await Post.findById(id);

    const index = post.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
        post.likes.push(req.userId)
    } else {
        post.likes = post.likes.filter((id) => id !== String(req.userId))
    }

    const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });

    res.status(200).json(updatedPost);
}