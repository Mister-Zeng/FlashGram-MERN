import express from 'express';

import { getAllPosts, addPost, updatePost, getById, deletePost, getUserById, likePost } from '../controllers/post-controller.js'

const postRouter = express.Router();

postRouter.get('/', getAllPosts)
postRouter.post('/add', addPost)
postRouter.put('/update/:id', updatePost)
postRouter.get('/:id', getById)
postRouter.delete('/:id', deletePost)
postRouter.get('/user/:id', getUserById)
postRouter.patch('/:id/likePost', likePost);

export default postRouter; 