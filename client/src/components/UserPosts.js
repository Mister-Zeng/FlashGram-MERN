import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Post from './Post';
import moment from 'moment';
import LoadingSpinner from './LoadingSpinner';
import UserContext from '../UserContext';

const UserPosts = () => {
    const { userData } = useContext(UserContext);
    const [user, setUser] = useState()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const id = userData.user._id;
        const sendRequest = async () => {
            const { data } = await axios.get(`/post/user/${id}`)
                .catch(error => console.log(error))
            console.log(data)
            setUser(data.user);
            setIsLoading(false);
        }
        sendRequest()
    }, [])

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