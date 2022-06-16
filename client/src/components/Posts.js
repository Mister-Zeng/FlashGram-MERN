import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import Post from './Post';

const Posts = () => {
    const [posts, setPosts] = useState();

    useEffect(() => {
        const sendRequest = async () => {
            const { data } = await axios.get("/post")
            return data;
        }
        sendRequest().then(data => setPosts(data.posts))
    }, []);

    return (
        <div className="posts">
            {posts &&
                posts.map((post, index) => (
                    <Post
                        id={post._id}
                        isUser={localStorage.getItem("userId") === post.user._id}
                        key={index}
                        username={post.user.username.charAt(0).toUpperCase() + post.user.username.slice(1)}
                        caption={post.caption}
                        selectedFile={post.selectedFile}
                        createAt={moment(post.createAt).format('MMM Do YY')}
                    />
                )).reverse()}
        </div>
    )
}

export default Posts;