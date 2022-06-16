import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Post from './Post';
import moment from 'moment';
import { useSelector } from 'react-redux';

const UserPosts = () => {
    const [user, setUser] = useState()

    useEffect(() => {
        const id = localStorage.getItem("userId")
        const sendRequest = async () => {
            const { data } = await axios.get(`/post/user/${id}`)
                .catch(error => console.log(error));
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
                        username={user.username.charAt(0).toUpperCase() + user.username.slice(1)}
                        caption={post.caption}
                        selectedFile={post.selectedFile}
                        createAt={moment(post.createAt).format('MMM Do YY')}
                    />
                )).reverse()}
        </div>
    )
}

export default UserPosts;