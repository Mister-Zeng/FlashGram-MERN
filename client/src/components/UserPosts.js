import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Post from './Post';

const UserPosts = () => {
    const [user, setUser] = useState()


    useEffect(() => {
        const id = localStorage.getItem("userId");
        const sendRequest = async () => {
            const res = await axios.get(`/post/user/${id}`)
                .catch(error => console.log(error));
            const data = await res.data;
            console.log(data)
            return data;

        }

        sendRequest()
            .then((data) => setUser(data.user))
    }, [])


    return (
        <div>
            {user &&
                user.posts.map((post, index) => (
                    <Post
                        id={post._id}
                        isUser={true}
                        key={index}
                        username={user.username}
                        caption={post.caption}
                        selectedFile={post.selectedFile}
                        createAt={post.createAt}
                    />
                )).reverse()}
        </div>
    )
}

export default UserPosts;