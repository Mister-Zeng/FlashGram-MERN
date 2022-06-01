import axios from "axios";
import React, { useEffect, useState } from "react";
import { Comments } from "../../Components/Comments/Comments";
import { PostCard } from "../../Components/PostCard/PostCard";
import { ShowContext } from "../../Components/ShowContext";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { AddPost } from "../../Components/AddPost/AddPost";
import { LoggedInNavBar } from '../../Components/NavBar/LoggedInNavBar';

export function Home() {
    const navigate = useNavigate();

    const [showComments, toggleComments] = useState(false);
    const [showAddPosts, toggleAddPost] = useState(false);
    const [posts, setPosts] = useState([]);
    const [userName, setUsername] = useState("");
    useEffect(() => {
      var token = localStorage.getItem("my_user_token");
      var base64Url = token.split(".")[1];
      var base64 = base64Url.replace("-", "+").replace("_", "/");
      setUsername(JSON.parse(atob(base64)).username);
      var config = {
        method: "get",
        url: `${process.env.REACT_APP_BE}/posts`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("my_user_token")}`
        }
      };
  
      axios(config)
        .then(function(response) {
          setPosts(response.data);
        })
        .catch(function(error) {
          navigate("/");
          console.log(error);
        });
    }, [showAddPosts]);
  
    const handleLogout = () => {
      localStorage.removeItem("my_user_token");
      navigate("/");
    };
    
    return (
        <div>
        <LoggedInNavBar />
      <ShowContext.Provider
        value={{
          comments: [showComments, toggleComments],
          add: [showAddPosts, toggleAddPost]
        }}
      >
        <div>
          {showComments.status ? <Comments /> : null}
          {showAddPosts ? <AddPost /> : null}
          <div className="header">
            <div onClick={() => toggleAddPost(true)} className="inner-header">
              new post
            </div>
          </div>
          <div className="wrapper">
            <div className="left-side">
              {posts.map((ele, i) => {
                return <PostCard post={ele} key={i} />;
              })}
            </div>
            <div className="right-side">
              <div className="user-profile-wrapper">
                <div className="user-profile">
                  {userName}
                </div>
                <span onClick={handleLogout} className="logout">
                  logout
                </span>
              </div>
            </div>
          </div>
        </div>
      </ShowContext.Provider>
      </div>
    );
}