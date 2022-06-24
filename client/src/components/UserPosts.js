import React, { useState, useEffect, useContext } from 'react';
import api from '../api/api';
import Post from './Post';
import moment from 'moment';
import LoadingSpinner from './LoadingSpinner';
import UserContext from '../context/UserContext';

const UserPosts = () => {
    const { userData } = useContext(UserContext);
    const [user, setUser] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const id = userData.user._id;

    useEffect(() => {
        try {
            const sendRequest = async () => {
                const { data } = await api.get(`/post/user/${id}`)
                setUser(data.user);
                setIsLoading(false);
            }
            sendRequest()
        } catch (error) {
            console.log(error.response.data.message)
        }
    }, [id])

    return (
        <div>
            {user &&
                user.posts.map((post, index) => (
                    <Post
                        key={index}
                        id={post._id}
                        isUser={true}
                        username={user.username.charAt(0).toUpperCase() + user.username.slice(1)}
                        caption={post.caption}
                        selectedFile={post.selectedFile}
                        createAt={moment(post.createAt).format('MMM Do YY')}
                        likes={post.likes}
                    />
                )).reverse()}
            {
                isLoading &&
                <LoadingSpinner />
            }
        </div>
    )
}

export default UserPosts;