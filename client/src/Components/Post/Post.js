import React from 'react';
import Avatar from '@mui/material/Avatar';
import "./Post.css";

export default function Post({ username, caption, imageUrl }) {
    return (
        <div className="container-box">
            <div className="post">
                <div className="post-header">
                    <Avatar
                        className="post-avatar"
                        alt="Remy Sharp"
                        src="/static/images/avatar/1.jpg" />
                    <h3 className="username-text">{username}</h3>
                </div>
                <img className="post-image" src={imageUrl} alt="userimagepost" />

                <h4 className="post-description"><strong>{username}</strong> {caption}</h4>

            </div>
        </div>
    )
}