import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Post from './Post';

const UserPosts = () => {
    const [user, setUser] = useState()
    const id = localStorage.getItem("token");
    const sendRequest = async () => {
        const res = await axios.get(`/post/user/${id}`)
            .catch(error => console.log(error));
        const data = await res.data;
        console.log(data)
        return data;
    }
    useEffect(() => {
        sendRequest()
            .then((data) => setUser(data.user))
    }, [])

    console.log(user)

    return (
        <div>
            {user &&
                user.posts.map((post, index) => (
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

export default UserPosts;