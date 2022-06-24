import React, { useState, useEffect, useContext } from 'react';
import api from '../api/api';
import moment from 'moment';
import Post from './Post';
import LoadingSpinner from './LoadingSpinner';
import UserContext from '../context/UserContext';

const Posts = () => {
    const { userData } = useContext(UserContext);
    const [posts, setPosts] = useState();
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const sendRequest = async () => {
            const { data } = await api.get("/post")
            return data
        }
        sendRequest()
            .then((data) => {
                setPosts(data.posts);
                setIsLoading(false)
            })
    }, []);
    console.log(posts)
    return (
        <div>
            <div className="posts">
                {posts &&
                    posts.map((post, index) => (
                        <Post
                            id={post._id}
                            isUser={userData.user._id === post.user._id}
                            key={index}
                            username={post.user.username.charAt(0).toUpperCase() + post.user.username.slice(1)}
                            caption={post.caption}
                            selectedFile={post.selectedFile}
                            createAt={moment(post.createAt).format('MMM Do YY')}
                            likes={post.likes}
                        />
                    )).reverse()}
            </div >
            {
                isLoading &&
                <LoadingSpinner />
            }
        </div >
    )
}

export default Posts;