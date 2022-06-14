import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Post from './Post';
import moment from 'moment';

const UserPosts = () => {
    const [user, setUser] = useState()


    useEffect(() => {
        const id = localStorage.getItem("userId");
        console.log(id)
        const sendRequest = async () => {
            const res = await axios.get(`/post/user/${id}`)
                .catch(error => console.log(error));
            const data = await res.data;
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
                        createAt={moment(post.createAt).format('MMM Do YY')}
                    />
                )).reverse()}
        </div>
    )
}

export default UserPosts;