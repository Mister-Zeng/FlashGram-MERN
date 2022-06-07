import React from 'react';
import { useSelector } from 'react-redux';
import Post from './post/post'

const Posts = () => {
    const posts = useSelector((state) => state.posts)

    return (
        { posts.map((post) => <Post post={post} />) }
    )
}