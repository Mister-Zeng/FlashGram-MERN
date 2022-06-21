import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Post from './Post';
import moment from 'moment';
import LoadingSpinner from './LoadingSpinner';

const UserPosts = () => {
    const [user, setUser] = useState()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const id = localStorage.getItem("userId")
        const sendRequest = async () => {
            const { data } = await axios.get(`/post/user/${id}`)
                .catch(error => console.log(error))
            console.log(data)
            return data;
        }

        sendRequest()
            .then((data) => {
                setUser(data.user);
                setIsLoading(false);
            })
    }, [])

    return (
        <div>
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
                            likeCount={post.likeCount}
                        />
                    )).reverse()}
            </div>
            {
                isLoading &&
                <LoadingSpinner />
            }
        </div>
    )
}

export default UserPosts;