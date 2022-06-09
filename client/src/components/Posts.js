import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import Post from './Post';

const Posts = () => {
    const [posts, setPosts] = useState();
    const sendRequest = async () => {
        const res = await axios.get("/post")
            .catch(error => console.log(error))
        const data = await res.data;
        return data
    };

    useEffect(() => {
        sendRequest()
            .then(data => setPosts(data.posts))
    }, []);

    console.log(posts);

    return (
        <div>
            {posts &&
                posts.map((post, index) => (
                    <Post
                        key={index}
                        username={post.user.username}
                        caption={post.caption}
                        selectedFile={post.selectedFile}
                        createAt={post.createAt}
                    />
                ))}
        </div>
    )
}

export default Posts;