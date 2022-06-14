import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import Post from './Post';

const Posts = () => {
    const [posts, setPosts] = useState();
    const sendRequest = async () => {
        const res = await axios.get("/post")
            .catch(error => console.log(error))
        const data = await res.data;
        return data
    };
    console.log(posts)
    useEffect(() => {
        sendRequest()
            .then(data => setPosts(data.posts))
    }, []);

    return (
        <div className="posts">
            {posts &&
                posts.map((post, index) => (
                    <Post
                        id={post._id}
                        isUser={localStorage.getItem("userId") === post.user._id}
                        key={index}
                        username={post.user.username}
                        caption={post.caption}
                        selectedFile={post.selectedFile}
                        createAt={moment(post.createAt).format('MMM Do YY')}
                    />
                )).reverse()}
        </div>
    )
}

export default Posts;