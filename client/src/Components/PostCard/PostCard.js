import React from "react";
import profile from "../profile.jpeg";
import "./PostCard.css";

export const PostCard = ({ post }) => {
  return (
    <div className="post-card">
      <div className="post-card-header">
        <img src={profile} className="avatar" alt="profilepicture" />
        {post.username}
      </div>
      <img src={post.image} alt={post.caption} className="post-image" />
      <div className="post-card-body">
        <span className="username">{post.username} </span>
        <span className="post-caption">{post.caption}</span>
        {post.comments.length > 0 ? (
          <p className="view-comments">
            View all comments
          </p>
        ) : (
          <p className="view-comments">
            No comments yet
          </p>
        )}
      </div>
    </div>
  );
};