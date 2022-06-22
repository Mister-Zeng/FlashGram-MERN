import express from 'express';

import { getAllPosts, addPost, updatePost, getById, deletePost, getUserById, likePost } from '../controllers/post-controller.js'
import auth from '../middleware/auth.js';

const postRouter = express.Router();

postRouter.get('/', getAllPosts)
postRouter.post('/add', auth, addPost)
postRouter.put('/update/:id', auth, updatePost)
postRouter.get('/:id', getById)
postRouter.delete('/:id', auth, deletePost)
postRouter.get('/user/:id', getUserById)
postRouter.patch('/:id/likePost', auth, likePost);

export default postRouter; 